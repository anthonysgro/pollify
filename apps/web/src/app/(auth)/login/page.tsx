"use client";

import { UserAuthForm } from "@/components/user-auth-form";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

const svgMotion = {
  rest: { x: 0, ease: "easeOut", duration: 0.2, type: "spring" },
  hover: {
    x: -5,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

export default function LoginPage() {
  return (
    <main className="">
      <>
        <div className="flex h-screen w-screen flex-col items-center justify-center px-8">
          <motion.div initial="rest" whileHover="hover" animate="rest">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute left-4 top-4 md:left-8 md:top-8",
              )}
            >
              <motion.div variants={svgMotion}>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
              </motion.div>
              Back
            </Link>{" "}
          </motion.div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Icons.logo className="mx-auto h-6 w-6" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <UserAuthForm registerMode={false} />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/register"
                className="hover:text-brand underline underline-offset-4"
              >
                Don&apos;t have an account? Sign Up
              </Link>
            </p>
          </div>
        </div>
      </>
    </main>
  );
}
