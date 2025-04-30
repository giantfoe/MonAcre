"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, ArrowRight, HelpCircle, Upload, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import CreatePoolForm from "./create-pool-form"
import AuthMessage from "@/components/auth-message"

export default function CreatePoolPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    assetType: "",
    assetName: "",
    description: "",
    location: "",
    fundingGoal: "",
    initialContribution: "",
    expectedReturn: "",
    duration: "",
    category: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    // For now, we'll just move to the success step
    setStep(4)
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Create an Investment Pool</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Define your asset, set your funding goal, and start pooling resources with investors around the world.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 1 ? "border-green-600 bg-green-600 text-white" : "border-gray-300 bg-white text-gray-400"}`}
          >
            1
          </div>
          <div className={`h-1 flex-1 ${step >= 2 ? "bg-green-600" : "bg-gray-300"}`}></div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 2 ? "border-green-600 bg-green-600 text-white" : "border-gray-300 bg-white text-gray-400"}`}
          >
            2
          </div>
          <div className={`h-1 flex-1 ${step >= 3 ? "bg-green-600" : "bg-gray-300"}`}></div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 3 ? "border-green-600 bg-green-600 text-white" : "border-gray-300 bg-white text-gray-400"}`}
          >
            3
          </div>
          <div className={`h-1 flex-1 ${step >= 4 ? "bg-green-600" : "bg-gray-300"}`}></div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 4 ? "border-green-600 bg-green-600 text-white" : "border-gray-300 bg-white text-gray-400"}`}
          >
            4
          </div>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className={step >= 1 ? "text-green-600" : "text-gray-500"}>Asset Details</span>
          <span className={step >= 2 ? "text-green-600" : "text-gray-500"}>Funding</span>
          <span className={step >= 3 ? "text-green-600" : "text-gray-500"}>Review</span>
          <span className={step >= 4 ? "text-green-600" : "text-gray-500"}>Complete</span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Provide information about the income-generating asset you want to fund.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assetType">Asset Type</Label>
              <Select value={formData.assetType} onValueChange={(value) => handleSelectChange("assetType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vehicle">Vehicle (Taxi, Truck, etc.)</SelectItem>
                  <SelectItem value="property">Property (Shop, Market Stall, etc.)</SelectItem>
                  <SelectItem value="equipment">Equipment (Generator, Tools, etc.)</SelectItem>
                  <SelectItem value="business">Business (Restaurant, Store, etc.)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assetName">Asset Name</Label>
              <Input
                id="assetName"
                name="assetName"
                placeholder="E.g., Taxi Fleet in Freetown"
                value={formData.assetName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the asset and how it will generate income"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="E.g., Freetown, Sierra Leone"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Asset Images</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WEBP (MAX. 5MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" multiple />
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>
              Back
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Funding Details</CardTitle>
            <CardDescription>Set your funding goal, initial contribution, and expected returns.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="fundingGoal">Funding Goal (USD)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The total amount needed to purchase the asset and cover any initial expenses.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="fundingGoal"
                name="fundingGoal"
                placeholder="E.g., 10000"
                type="number"
                value={formData.fundingGoal}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="initialContribution">Your Initial Contribution (USD)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Your own investment in the pool. A higher initial contribution shows your commitment to the
                        project.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="initialContribution"
                name="initialContribution"
                placeholder="E.g., 2000"
                type="number"
                value={formData.initialContribution}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="expectedReturn">Expected Monthly Return (%)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        The estimated monthly return on investment as a percentage of the total funding amount.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="expectedReturn"
                name="expectedReturn"
                placeholder="E.g., 15"
                type="number"
                value={formData.expectedReturn}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Funding Duration (Days)</Label>
              <Select value={formData.duration} onValueChange={(value) => handleSelectChange("duration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                If your pool reaches 80% of the funding goal, investors will vote using quadratic voting to decide
                whether to proceed with the purchase.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Your Pool</CardTitle>
            <CardDescription>Review the details of your investment pool before creating it.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Asset Details</TabsTrigger>
                <TabsTrigger value="funding">Funding Details</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Asset Type</h3>
                    <p>{formData.assetType || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Asset Name</h3>
                    <p>{formData.assetName || "Not specified"}</p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p>{formData.description || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p>{formData.location || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p>{formData.category || "Not specified"}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="funding" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Funding Goal</h3>
                    <p>${formData.fundingGoal || "0"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Initial Contribution</h3>
                    <p>${formData.initialContribution || "0"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Expected Monthly Return</h3>
                    <p>{formData.expectedReturn || "0"}%</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Funding Duration</h3>
                    <p>{formData.duration || "0"} days</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Platform Fee</h3>
                  <p>
                    2% of funding amount ($
                    {formData.fundingGoal ? (Number.parseFloat(formData.fundingGoal) * 0.02).toFixed(2) : "0"})
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Confirmation</AlertTitle>
              <AlertDescription>
                By creating this pool, you agree to our terms of service and confirm that all information provided is
                accurate.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Create Pool</Button>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Pool Created Successfully!</CardTitle>
            <CardDescription>Your investment pool has been created and is now live.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{formData.assetName}</h3>
              <p className="mx-auto max-w-md text-gray-500 dark:text-gray-400">
                Your pool is now live and ready to receive investments. Share your unique blink link to attract
                investors.
              </p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
              <p className="mb-2 text-sm font-medium">Your Blink Link</p>
              <div className="flex items-center">
                <Input
                  readOnly
                  value={`https://solfund.io/blink/${Math.random().toString(36).substring(2, 8)}`}
                  className="mr-2"
                />
                <Button variant="outline" size="sm">
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Button variant="outline">View Pool</Button>
            <Button>Share on X</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
