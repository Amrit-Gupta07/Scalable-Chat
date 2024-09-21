import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CHAT_GROUP } from "@/lib/apiAuthRoutes";
import axios from "axios";
import { toast } from "sonner";
import { clearCache } from "@/actions/common";

const DeleteChatGroup = ({
  open,
  setOpen,
  groupId,
  token,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: string;
  token: string;
}) => {
  const handleDeleteChatGroup = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${CHAT_GROUP}/${groupId}`, {
        headers: { Authorization: token },
      });
        if (data?.message) {
        clearCache("dashboard");
        toast.success("Chat group deleted successfully");
        setOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again");
      }
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            group and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleDeleteChatGroup}>
            {loading ? "Processing.." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteChatGroup;
