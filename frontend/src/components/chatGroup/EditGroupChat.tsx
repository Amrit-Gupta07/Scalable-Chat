"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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
import { GroupChatType } from "../../../types";
import { clearCache } from "@/actions/common";
const EditGroupChat = ({
  user,
  group,
  open,
  setOpen,
}: {
  user: CustomUser;
  group: GroupChatType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });
  const onSubmit = async (payload: createChatSchemaType) => {
      try {
      setLoading(true);
        
      const { data } = await axios.put(`${CHAT_GROUP}/${group.id}`, payload, {
        headers: {
          Authorization: user.token,
        },
      });
      if (data?.message) {
        setOpen(false);
        toast.success("Chat updated successfully");
        clearCache("dashboard");
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
    useEffect(() => {
        setValue("title", group.title)
        setValue("passcode", group.passcode)
    },[])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGroupChat;
