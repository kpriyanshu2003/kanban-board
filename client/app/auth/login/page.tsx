"use client";

import React, { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/actions/auth";

function Page() {
  const router = useRouter();
  const redirectParams = useSearchParams().get("redirect");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password)
      return toast.error("Please fill all fields");

    setLoading(true);
    login(
      JSON.stringify({ email: formData.email, password: formData.password })
    )
      .then((res) => {
        if (!res.success) throw new Error(res.message);

        toast.success("Login successful. Redirecting...");
        console.log(res.data.token);
        document.cookie = `token=${res.data.token}; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 7
        )}`;
        setTimeout(() => router.push(redirectParams || "/kanban"), 1500);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-[#dee1e6] h-screen grid place-items-center">
      <div className="rounded-lg shadow-lg p-4 px-8 bg-white text-center w-[450px]">
        <div>
          <div className="font-bold text-2xl my-3">Welcome Back</div>
          <div className="text-sm my-3 px-2">
            Dive back into a world with a simple sign-in.
            <br />
            Your next adventure awaits - let&apos;s get started.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="grid w-full max-w-sm gap-1.5 text-left my-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="my-6">
            <div className="grid w-full max-w-sm gap-1.5 text-left my-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="・・・・・・・"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="text-right">
              <Link
                href="/auth/forgot"
                className="text-xs text-black font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white flex gap-3"
          >
            {loading ? (
              <>
                <CgSpinner className="animate-spin w-5 h-5 text-white" />
                Logging In
              </>
            ) : (
              <span>Login In</span>
            )}
          </Button>
        </form>
        <div className="text-sm mt-4">
          <span>Don&apos; have an account ?</span>{" "}
          <Link href="/auth/register" className="text-black font-medium">
            Register Now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
