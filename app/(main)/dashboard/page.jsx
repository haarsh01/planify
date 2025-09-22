"use client";
import React from 'react'
import {useUser} from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {useForm} from "react-hook-form";
import { usernameSchema } from '@/app/lib/validators';
import {zodResolver} from "@hookform/resolvers/zod"
import { useEffect } from 'react';



const Dashboard = () => {
  const {isLoaded, user} = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() =>{
    setValue("username", user?.username);

  }, [isLoaded]);



  const onSubmit = async (data) => {};

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome, {user ?.firstName}
          </CardTitle>
        </CardHeader>

      </Card>

      <CardHeader>
        <CardTitle>
          Your Unique Link
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span>{window?.location.origin}</span>
              <Input{...register("username")} placeholder="username" />
            </div>
{errors.username && (

  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
)}

          </div>
          <Button type="submit">Update Username</Button>
        </form>
      </CardContent>
    </div>
  )
}

export default Dashboard
