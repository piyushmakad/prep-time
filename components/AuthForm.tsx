"use client";
import React from "react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/actions/auth.action";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";

interface FormInputProps<T extends FieldValues> {
  name: string;
  label: string;
  control: Control<T>;
  placeholder?: string;
  type: "text" | "email" | "password" | "file";
}

const authFromSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
};
const AuthForm = ({ type }: { type: FormType }) => {
  const isSignIn = type === "sign-in";
  const router = useRouter();
  const formSchema = authFromSchema(type);
  //define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //define submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        const { email, password } = values;
        if (!email || !password) {
          toast.error("Email and password are required.");
          return;
        }
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredentials.user.getIdToken();
        if (!idToken) {
          toast.error("Sign In Failed.");
          return;
        }
        await signIn({
          email: email,
          idToken: idToken,
        });
        toast.success("Sign in successful!");
        router.push("/");
      } else {
        const { name, email, password } = values;
        if (!name || !email || !password) {
          toast.error("All fields are required.");
          return;
        }
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ); // used to create user in firebase auth , not in firestore
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email: email,
          password: password,
        });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.success("Account created successfully!");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`An error occurred: ${error || "Unknown error"}`);
    }
  }

  const FormField = ({
    name,
    control,
    label,
    placeholder,
    type = "text",
  }: FormInputProps<T>) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="label">{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} type={type} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepTime</h2>
        </div>

        <h3>Practice job interviews with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {!isSignIn && (
              <FormField
                name="name"
                control={form.control}
                label="Name"
                placeholder="Enter your name :"
                type="text"
              />
            )}
            <FormField
              name="email"
              control={form.control}
              label="Email"
              placeholder="Enter your Email :"
              type="email"
            />
            <FormField
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter your Password :"
              type="password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-primary-100 ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
