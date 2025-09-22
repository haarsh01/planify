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
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

import { updateUsername } from '@/actions/users';
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



  const {
    loading: loadingUpdates,
    data: upcomingMeetings,
    fn: fnUpdates,
  } = useFetch(updateUsername);

  useEffect(() => {
    (async () => await fnUpdates())();
  }, []);

  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  const onSubmit = async (data) => {
    await fnUpdateUsername(data.username);
  };

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
    {error && (
                <p className="text-red-500 text-sm mt-1">{error?.message}</p>
              )}

          </div>
          {loading && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
          <Button type="submit">Update Username</Button>
        </form>
      </CardContent>
    </div>
  )
}

export default Dashboard
