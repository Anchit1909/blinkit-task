"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ emailId: "", password: "" });
  const [error, setError] = useState(false);

  const handleChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const loginFunction = async () => {
    if (!userInfo.emailId || !userInfo.password) {
      alert("Please fill all the required fields");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/auth/login`,
        {
          emailId: userInfo.emailId,
          password: userInfo.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success === true) {
        localStorage.setItem("auth-token", response.data.token);
        router.push("/");
      } else {
        setError(true);
      }
    } catch (error: any) {
      setError(true);
    }
  };
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="emailId"
                  placeholder="Enter your email"
                  value={userInfo.emailId}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={userInfo.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </form>
          {error && (
            <p className="text-red-500 text-sm mt-2">Wrond credentials</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={loginFunction}>Login</Button>
          <Button variant="outline" onClick={() => router.push("/signup")}>
            SignUp
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
