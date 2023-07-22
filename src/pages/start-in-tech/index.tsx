"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Linkedin, LinkedinIcon, LucideLinkedin, MoveLeft, MoveRight, MoveRightIcon, TwitterIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import FadeIn from 'react-fade-in';
import { Separator } from "@radix-ui/react-select"
import Lottie from 'react-lottie';
import animationData from '@/assets/congratulations.json';
import { GoogleFormProvider, useGoogleForm, useShortAnswerInput } from 'react-google-forms-hooks'

// import getGoogleFormAsJson from '@/lib/utils'
import { googleFormsToJson } from "react-google-forms-hooks";
import { supabaseClient } from "./client"
import Navbar from "@/components/Navbar"


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

// subscribe to my newsletter
// follow me on linkedin and twitter

const profileFormSchema = z.object({
    firstname: z
        .string()
        .min(2, {
            message: "first name must be at least 2 characters.",
        })
        .max(30, {
            message: "first name must not be longer than 30 characters.",
        }),

    lastname: z
        .string()
        .min(2, {
            message: "last name must be at least 2 characters.",
        })
        .max(30, {
            message: "last name must not be longer than 30 characters.",
        }),

    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    reason_for_learning: z.string().max(160).min(4),
    referrer: z.string().max(160).min(4).optional(),
    outreach: z.string().max(160).min(4),

    twitter: z.string().url({ message: "Please enter a valid URL." }).optional(),


    linkedin:
        z.string().url({ message: "Please enter a valid URL." }).optional()
    ,
    age_group:
        z.string({ required_error: "Please enter your age group" })


})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    reason_for_learning: "I'm really passionate",
}

const index = () => {
    const [isError, setIsError] = useState<number>()
    // const [formLocation, setFormLocation] = useState('subscribe_socials')
    const [formLocation, setFormLocation] = useState('basic_info')



    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })
    const errorMessages = form.formState.errors
    const errorBool = errorMessages.firstname?.message?.length && errorMessages.lastname?.message?.length && errorMessages.email?.message?.length && errorMessages.outreach?.message?.length && errorMessages.age_group?.message?.length
    
    useEffect(() => {
        if (errorBool) {
            alert("please fill all fields")

        }
    }, [errorBool])

 
 

    async function onSubmit(data: ProfileFormValues) {


        alert(data)
        const { error } = await supabaseClient
            .from("applicants")
            .insert([{ data }]);

        toast({
            title: "You submitted the following values:",
            description: (

                { data }


            ),
        })
    }

    const handleNextItem = () => {
        if (formLocation == "basic_info") {
            setFormLocation("reason_field")
        }
        if (formLocation == "reason_field") {
            setFormLocation("socials")
        }
        if (formLocation == "socials") {
            setFormLocation("submit")
        }

    }

    const handlePreviousItem = () => {
        if (formLocation == "reason_field") {
            setFormLocation("basic_info")
        }
        if (formLocation == "socials") {
            setFormLocation("reason_field")
        }
        if (formLocation == "submit") {
            setFormLocation("socials")
        }
    }


    return (
        <>

            <Navbar />
            <main className="md:w-full lg:w-[35vw] m-2 lg:mx-auto p-6 border border-[#F61067]/[0.2] rounded-lg mt-20 lg:mt-10 lg:translate-x-[-50%] lg:translate-y-[-50%] lg:absolute lg:top-[50%] lg:left-[50%]">
                <Form {...form}>
                    {/* {[form.formState.errors].map((item:any,index:number)=>console.log(item.message?.length ))} */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {formLocation == "basic_info" &&
                            <>

                                <FadeIn className="space-y-6">
                                    <div className="space-y-0.5">
                                        <h2 className="text-2xl font-bold tracking-tight">Basic Info</h2>
                                        <p className="text-muted-foreground">
                                            Let's get to know you
                                        </p>
                                    </div>
                                    <SelectSeparator className="my-1" />
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Mitchel" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Inaju" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Inaju" {...field} />
                                                </FormControl>

                                                <FormDescription>
                                                    Please Enter a valid Email Address{" "}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </FadeIn>
                            </>
                        }
                        {formLocation == "reason_field" &&
                            <>
                                <FadeIn className="space-y-6">

                                    <div className="space-y-0.5">
                                        <h2 className="text-2xl font-bold tracking-tight">What's your motivation?</h2>
                                        <p className="text-muted-foreground">
                                            I love it when people have a strong reason for doing what they do
                                        </p>
                                    </div>
                                    <Separator className="my-6" />
                                    <FormField
                                        control={form.control}
                                        name="reason_for_learning"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Why do you want to learn HTML/CSS?</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us a little bit about yourself"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="age_group"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>What age group are you in?</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Please Select your age group" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="m@example.com">below 13</SelectItem>
                                                        <SelectItem value="m@google.com">13-16</SelectItem>
                                                        <SelectItem value="m@google.com">17-20</SelectItem>
                                                        <SelectItem value="m@google.com">21-25</SelectItem>
                                                        <SelectItem value="m@google.com">25-30</SelectItem>
                                                        <SelectItem value="m@google.com">31-40</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="outreach"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Where did you find out about this?</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Please select an option" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="m@example.com">Twitter</SelectItem>
                                                        <SelectItem value="m@google.com">Linkedin</SelectItem>
                                                        <SelectItem value="m@google.com">Whatsapp</SelectItem>
                                                        <SelectItem value="m@google.com">Threads</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="referrer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Who referred you?</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Alexender Dowie?"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </FadeIn>
                            </>
                        }
                        {formLocation == "socials" &&
                            <>
                                <FadeIn className="space-y-6">
                                    <div className="space-y-0.5">
                                        <h2 className="text-2xl font-bold tracking-tight">Social Media (Optional)</h2>

                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`twitter`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    You have a twitter or linkedin?
                                                </FormLabel>
                                                <FormDescription >
                                                    Add links to your twitter, blog, or linkedin profiles.
                                                </FormDescription>
                                                <FormControl>
                                                    <div className="flex gap-2 items-center">
                                                        <TwitterIcon />
                                                        <Input {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`linkedin`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex gap-2 items-center">
                                                        <Linkedin />
                                                        <Input {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </FadeIn>

                            </>}
                        {formLocation == "submit" &&
                            <>
                                <FadeIn className="space-y-6">

                                    <FormField
                                        control={form.control}
                                        name="newsletter"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start justify-between rounded-lg">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Subscribe to my newsletter</FormLabel>
                                                    <FormDescription>
                                                        Get weekly emails about how to grow your career in tech
                                                    </FormDescription>
                                                </div>
                                                <iframe src="https://mitchelinaju.substack.com/embed"
                                                    className="p-0 m-0 bg-white w-full h-[190px]"
                                                    frameBorder="0" scrolling="no"></iframe>
                                                <FormControl>
                                                    <>
                                                        {/* <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                /> */}
                                                    </>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-center gap-2">


                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => handlePreviousItem()}

                                        >
                                            <MoveLeft className=" mr-3 w-[13px]" />
                                            Go Back
                                        </Button>

                                        <Button
                                            size="sm"
                                            className="mt-2"
                                            type="submit">Send Application</Button>
                                    </div>
                                    <FormDescription>
                                        *Make sure you send your application after subscribing to the newsletter, if not you wouldn't be considered
                                    </FormDescription>
                                </FadeIn>
                            </>}

                        {formLocation != "submit" && formLocation != "subscribe_socials" &&
                            <FadeIn className="space-y-6">

                                <div className="flex items-center gap-2">
                                    {formLocation != "basic_info" &&
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => handlePreviousItem()}

                                        >
                                            <MoveLeft className=" mr-3 w-[13px]" />
                                            Go Back
                                        </Button>
                                    }
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="mt-2"
                                        onClick={() => handleNextItem()}
                                    >
                                        Next
                                        <MoveRight className=" ml-3 w-[13px]" />
                                    </Button>


                                </div>

                            </FadeIn>
                        }
                        {formLocation == "subscribe_socials" &&
                            <>
                                <div className="space-y-0.5">
                                    <h2 className="text-2xl font-bold tracking-tight">Congratulations</h2>
                                    <p className="text-muted-foreground">
                                        You have reached the end of the application process.
                                    </p>
                                </div>
                                <Lottie
                                    options={defaultOptions}
                                    height={400}
                                    width={400}
                                />
                                <p>Join the whatsapp group here</p>
                            </>
                        }
                    </form>
                </Form>

            </main>
        </>
    )
}

export default index