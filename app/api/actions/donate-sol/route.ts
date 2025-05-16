import { 
  ActionGetResponse, 
  ActionPostRequest, 
  ActionPostResponse, 
  ACTIONS_CORS_HEADERS, 
  MEMO_PROGRAM_ID, // Optional: if you want to add a memo
  BLOCKCHAIN_IDS   // Required for x-blockchain-ids header
} from "@solana/wallet-adapter-base";
import { 
  Connection, 
  LAMPORTS_PER_SOL, 
  PublicKey, 
  SystemProgram, 
  Transaction, 
  // TransactionInstruction // Optional: if you want to add a memo
} from "@solana/web3.js";
import { NextResponse } from 'next/server';

// Configuration
const SOLANA_RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || 'https://api.devnet.solana.com';
const DEFAULT_SOL_AMOUNT = 0.01;
// IMPORTANT: Replace with your project's treasury/donation wallet address
const DEFAULT_RECIPIENT_WALLET = new PublicKey('YOUR_PROJECT_TREASURY_WALLET_ADDRESS_HERE'); 

// CAIP-2 format for Solana devnet
const blockchain = BLOCKCHAIN_IDS.devnet; // Or BLOCKCHAIN_IDS.mainnet for mainnet

// Standardized headers for Blink Providers
const responseHeaders = {
  ...ACTIONS_CORS_HEADERS,
  "x-blockchain-ids": blockchain.toString(), // Ensure it's a string if the type is complex
  "x-action-version": "1.0.0", // Specify your action version, e.g., 1.0.0 or as per tutorial if specified
};

export const GET = async (req: Request) => {
  try {
    const response: ActionGetResponse = {
      icon: new URL("/donate-sol.png", new URL(req.url).origin).toString(), // Assumes donate-sol.png is in /public
      label: "Donate SOL",
      title: "Donate SOL to MonAcre",
      description:
        "Help fund MonAcre by sending some SOL. This Blink demonstrates how to donate SOL on the Solana blockchain.",
      links: {
        actions: [
          {
            label: "Send 0.01 SOL",
            href: `/api/actions/donate-sol?amount=0.01`,
          },
          {
            label: "Send 0.1 SOL",
            href: `/api/actions/donate-sol?amount=0.1`,
          },
          {
            label: "Send 1 SOL",
            href: `/api/actions/donate-sol?amount=1`,
          },
          {
            label: "Send SOL (Custom Amount)", // Action with input
            href: `/api/actions/donate-sol?amount={amount}`, // Parameterized href
            parameters: [
              {
                name: "amount", // Input field name
                label: "Enter SOL amount", // Display label for the input field
                required: true, // Optional: mark if the parameter is required
              },
            ],
          },
        ],
      },
    };
    return NextResponse.json(response, { headers: responseHeaders });
  } catch (err) {
    console.error(err);
    let message = "An error occurred processing the GET request";
    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json(
      { message }, 
      { status: 500, headers: responseHeaders }
    );
  }
};

// OPTIONS endpoint is required for CORS preflight requests
export const OPTIONS = async (req: Request) => {
  return new Response(null, { headers: responseHeaders });
};

export const POST = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const amountParam = searchParams.get("amount");

    const body: ActionPostRequest = await req.json();
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return NextResponse.json(
        { message: 'Invalid "account" input. Expected a Solana public key.' }, 
        { status: 400, headers: responseHeaders }
      );
    }

    let amount = DEFAULT_SOL_AMOUNT;
    if (amountParam) {
      try {
        amount = parseFloat(amountParam);
        if (amount <= 0 || isNaN(amount)) {
          return NextResponse.json(
            { message: 'Invalid "amount" input. Must be a positive number.' }, 
            { status: 400, headers: responseHeaders }
          );
        }
      } catch {
        return NextResponse.json(
          { message: 'Invalid "amount" input. Expected a number.' }, 
          { status: 400, headers: responseHeaders }
        );
      }
    }

    const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');

    const transaction = new Transaction();
    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: DEFAULT_RECIPIENT_WALLET,
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    );
    
    // Optional: Add a memo to the transaction
    // transaction.add(
    //   new TransactionInstruction({
    //     keys: [{ pubkey: account, isSigner: true, isWritable: true }],
    //     data: Buffer.from("Donation via MonAcre Blink", "utf-8"),
    //     programId: new PublicKey(MEMO_PROGRAM_ID),
    //   }),
    // );

    const payload: ActionPostResponse = {
      transaction: transaction
        .serialize({ requireAllSignatures: false })
        .toString("base64"),
      message: `Successfully prepared transaction to donate ${amount} SOL to MonAcre.`,
    };

    return NextResponse.json(payload, { headers: responseHeaders });

  } catch (err) {
    console.error(err);
    let message = "An error occurred processing the POST request";
    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json(
      { message }, 
      { status: 500, headers: responseHeaders }
    );
  }
};