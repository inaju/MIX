"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Linkedin,
  LinkedinIcon,
  LucideLinkedin,
  MoveLeft,
  MoveRight,
  MoveRightIcon,
  TwitterIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
import { Separator } from "@radix-ui/react-select";
import Lottie from "react-lottie";
import animationData from "@/assets/congratulations.json";
import {
  GoogleFormProvider,
  useGoogleForm,
  useShortAnswerInput,
} from "react-google-forms-hooks";

// import getGoogleFormAsJson from '@/lib/utils'
import { googleFormsToJson } from "react-google-forms-hooks";
// import { supabaseClient } from "./client"
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
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

  linkedin: z.string().url({ message: "Please enter a valid URL." }).optional(),
  age_group: z.string({ required_error: "Please enter your age group" }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  reason_for_learning: "I'm really passionate about....",
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPBASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
if (SUPABASE_URL) {
  var supabaseClient = createClient(SUPABASE_URL, SUPBASE_ANON_KEY);
}

const Index = () => {
  const [uploadingData, setUploadingData] = useState(false);
  // const [formLocation, setFormLocation] = useState('subscribe_socials')
  const [formLocation, setFormLocation] = useState("basic_info");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const errorMessages = form.formState.errors;
  const errorBool =
    errorMessages.firstname?.message?.length &&
    errorMessages.lastname?.message?.length &&
    errorMessages.email?.message?.length &&
    errorMessages.outreach?.message?.length &&
    errorMessages.age_group?.message?.length;

  //   useEffect(() => {
  //     checkFields();
  //   }, [errorBool]);

  async function onSubmit(data: ProfileFormValues) {
    alert("submitting");

    setUploadingData(true);
    const { error } = await supabaseClient
      .from("applicants")
      .insert([{ ...data }]);
    console.log(error, "error");
    if (!error) {
      setFormLocation("subscribe_socials");
    } else {
      alert("Please try again");
    }
    setUploadingData(false);

    // toast({
    //     title: "You submitted the following values:",
    //     description: (

    //         { data }

    //     ),
    // })
  }

  const handleNextItem = () => {
    if (formLocation == "basic_info") {
      setFormLocation("reason_field");
    }
    if (formLocation == "reason_field") {
      setFormLocation("socials");
    }
    if (formLocation == "socials") {
      setFormLocation("submit");
    }
  };

  const handlePreviousItem = () => {
    if (formLocation == "reason_field") {
      setFormLocation("basic_info");
    }
    if (formLocation == "socials") {
      setFormLocation("reason_field");
    }
    if (formLocation == "submit") {
      setFormLocation("socials");
    }
  };

  const checkFields = () => {
    const checkKeys = Object.keys(form.formState.errors);
    if (checkKeys.length > 0) {
      alert("please fill all fields");
    }
  };

  return (
    <>
      <Navbar />
      <main className="md:w-full lg:w-[35vw] m-2 lg:mx-auto p-6 border border-[#F61067]/[0.2] rounded-lg mt-20 lg:mt-10 lg:translate-x-[-50%] lg:translate-y-[-50%] lg:absolute lg:top-[50%] lg:left-[50%]">
        <Form {...form}>
          {/* {[form.formState.errors].map((item:any,index:number)=>console.log(item.message?.length ))} */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formLocation == "basic_info" && (
              <>
                <FadeIn className="space-y-6">
                  <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Basic Info
                    </h2>
                    <p className="text-muted-foreground">
                      Let&#39;s get to know you
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
            )}
            {formLocation == "reason_field" && (
              <>
                <FadeIn className="space-y-6">
                  <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                      What&#39;s your motivation?
                    </h2>
                    <p className="text-muted-foreground">
                      I love it when people have a strong reason for doing what
                      they do
                    </p>
                  </div>
                  <Separator className="my-6" />
                  <FormField
                    control={form.control}
                    name="reason_for_learning"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Why do you want to learn HTML/CSS?
                        </FormLabel>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Please Select your age group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="b-13">below 13</SelectItem>
                            <SelectItem value="13-16`">13-16</SelectItem>
                            <SelectItem value="17-20">17-20</SelectItem>
                            <SelectItem value="21-24">21-24</SelectItem>
                            <SelectItem value="25-30">25-30</SelectItem>
                            <SelectItem value="31-40">31-40</SelectItem>
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
                        <FormLabel>
                          Where did you find out about this?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Please select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Twitter">Twitter</SelectItem>
                            <SelectItem value="Linkedin">Linkedin</SelectItem>
                            <SelectItem value="Whatsapp">Whatsapp</SelectItem>
                            <SelectItem value="Threads">Threads</SelectItem>
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
                        <FormDescription>*Optional Field</FormDescription>
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
            )}
            {formLocation == "socials" && (
              <>
                <FadeIn className="space-y-6">
                  <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Social Media (Optional)
                    </h2>
                  </div>
                  <FormField
                    control={form.control}
                    name={`twitter`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>You have a twitter or linkedin?</FormLabel>
                        <FormDescription>
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
              </>
            )}
            {formLocation == "submit" && (
              <>
                <FadeIn className="space-y-6">
                  <FormItem className="flex flex-col items-start justify-between rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Subscribe to my newsletter
                      </FormLabel>
                      <FormDescription>
                        Get weekly emails about how to grow your career in tech
                      </FormDescription>
                    </div>
                    <iframe
                      src="https://mitchelinaju.substack.com/embed"
                      className="p-0 m-0 bg-white w-full h-[190px]"
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                  </FormItem>

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
                      onClick={checkFields}
                      size="sm"
                      className="mt-2"
                      disabled={uploadingData}
                      type="submit"
                    >
                      {uploadingData ? "Processing..." : "Send Application"}
                    </Button>
                  </div>
                  <FormDescription>
                    *Make sure you send your application after subscribing to
                    the newsletter, if not, it wouldn&#39;t go through
                  </FormDescription>
                </FadeIn>
              </>
            )}

            {formLocation != "submit" &&
              formLocation != "subscribe_socials" && (
                <FadeIn className="space-y-6">
                  <div className="flex items-center gap-2">
                    {formLocation != "basic_info" && (
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
                    )}
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
              )}
            {formLocation == "subscribe_socials" && (
              <>
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Congratulations
                  </h2>
                  <p className="text-muted-foreground">
                    You have reached the end of the application process.
                  </p>
                </div>
                <Lottie options={defaultOptions} height={300} width={300} />
                <a
                  className="text-blue-500"
                  href="htps://chat.whatsapp.com/EEplj71Rtd31HRNGk2mS5Y"
                >
                  Join the whatsapp group here
                </a>
              </>
            )}
          </form>
        </Form>
      </main>
    </>
  );
};

export default Index;
