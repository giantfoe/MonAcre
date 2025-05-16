console.log('--- POOLS API ROUTE MODULE LOADED ---'); // Top-level log
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Assuming your supabase client is exported from here

export async function POST(request: Request) {
  console.log('--- POOLS API ROUTE HIT ---'); // New prominent log
  try {
    const body = await request.json();
    const { name, description, funding_goal, creator_wallet_address, pool_wallet_address, status } = body;

    // Basic validation (you can expand this)
    if (!name || !funding_goal || !creator_wallet_address || !pool_wallet_address) {
      return NextResponse.json({ error: 'Missing required fields: name, funding_goal, creator_wallet_address, and pool_wallet_address are required.' }, { status: 400 });
    }

    // Validate funding_goal is a positive number
    if (typeof funding_goal !== 'number' || funding_goal <= 0) {
      return NextResponse.json({ error: 'Funding goal must be a positive number.' }, { status: 400 });
    }
    
    // Validate creator_wallet_address (basic check for now)
    if (typeof creator_wallet_address !== 'string' || creator_wallet_address.length < 32) { // Basic length check for Solana address
        return NextResponse.json({ error: 'Invalid creator wallet address.' }, { status: 400 });
    }

    // Validate pool_wallet_address (basic check for now)
    if (typeof pool_wallet_address !== 'string' || pool_wallet_address.length < 32) { // Basic length check for Solana address
        return NextResponse.json({ error: 'Invalid pool wallet address.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('pools')
      .insert([
        {
          name,
          description: description || null, // Optional field
          funding_goal,
          creator_wallet_address,
          pool_wallet_address, // Add the new field here
          status: status || 'open', // Default status to 'open' if not provided
          // 'current_funding' will default to 0 as per table definition
          // 'updated_at' and 'created_at' will be handled by database defaults/triggers
        },
      ])
      .select(); // Optionally select the inserted data to return it

    // Enhanced logging to see the raw Supabase response
    console.log('Supabase insert response:', { data, error });

    if (error) {
      console.error('Supabase error creating pool:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If data is an empty array, it means the insert might have been blocked by RLS without a hard error
    if (data && data.length === 0 && !error) {
      console.warn('Supabase insert returned empty data array, possibly due to RLS. Wallet address:', creator_wallet_address);
      // Optionally, you could return a more specific error to the client here
      // return NextResponse.json({ error: 'Pool creation failed. Ensure user profile exists for this wallet.' }, { status: 403 });
    }

    return NextResponse.json({ message: 'Pool created successfully', pool: data && data.length > 0 ? data[0] : null }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating pool:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { data, error } = await supabase
      .from('pools')
      .select('*') // Select all columns
      .order('created_at', { ascending: false }); // Optionally order by creation date

    // Enhanced logging to see the raw Supabase response
    console.log('Supabase insert response:', { data, error });

    if (error) {
      console.error('Supabase error fetching pools:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ pools: data }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching pools:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
}