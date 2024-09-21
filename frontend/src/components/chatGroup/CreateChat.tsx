"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { set, useForm } from "react-hook-form";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/chatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { CHAT_GROUP } from "@/lib/apiAuthRoutes";
import {
  CustomSession,
  CustomUser,
} from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";

const CreateChat = ({ user }: { user: CustomUser }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });
  const onSubmit = async (payload: createChatSchemaType) => {
    console.log(payload);
    try {
      setLoading(true);
      const { data } = await axios.post(CHAT_GROUP, payload, {
        headers: {
          Authorization: user.token,
        },
      });
      if (data?.message) {
        setOpen(false);
        toast.success("Chat created successfully");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Groups</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Enter chat title"
                type="text"
                {...register("title")}
              />
              <span className="text-red-400">{errors.title?.message}</span>

              <Input
                placeholder="Enter passcode"
                type="text"
                {...register("passcode")}
              />
              <span className="text-red-400">{errors.title?.message}</span>

              <Button disabled={loading} type="submit">
                Create
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChat;
