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
export default function page() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: "",
    emailId: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const signUpFunction = async () => {
    if (!userInfo.name || !userInfo.emailId || !userInfo.password) {
      alert("Please fill all the required fields");
      return;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/auth/signup`,
      {
        name: userInfo.name,
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
      alert(response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={userInfo.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              signUpFunction();
            }}
          >
            Signup
          </Button>
          <Button variant="outline" onClick={() => router.push("/login")}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
