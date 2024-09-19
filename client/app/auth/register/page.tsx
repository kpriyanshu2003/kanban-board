"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { register } from "@/actions/auth";

function Page() {
  const router = useRouter();
  const redirectParams = useSearchParams().get("redirect");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword)
      return toast.error("Please fill all fields");
    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);

    register(formData.email, formData.password)
      .then((res) => {
        if (!res.success) throw new Error(res.message);

        toast.success("Account created successfully. Redirecting...");
        document.cookie = `token=${res.data.token}; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 7
        )}`;
      })
      .then(() =>
        setTimeout(() => router.push(redirectParams || "/kanban"), 1500)
      )
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-[#dee1e6] h-screen grid place-items-center">
      <div className="rounded-lg shadow-lg p-4 px-8 bg-white text-center w-[450px]">
        <div>
          <div className="font-bold text-2xl my-3">Join Us Today</div>
          <div className="text-sm my-3 px-4">
            Register today and manage all your tasks effectively.
            <br />
            Your adventure begins here.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
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

          <div className="grid w-full max-w-sm gap-1.5 text-left my-4">
            <Label htmlFor="confPass">Confirm Password</Label>
            <Input
              type="password"
              id="confPass"
              placeholder="・・・・・・・"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black text-white flex gap-3"
          >
            {loading ? (
              <>
                <CgSpinner className="animate-spin w-5 h-5 text-white" />
                Registering
              </>
            ) : (
              <span>Register</span>
            )}
          </Button>
        </form>

        <div className="text-sm mt-4">
          <span>Already Have an Account ?</span>{" "}
          <Link href="/auth/login" className="text-black font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
