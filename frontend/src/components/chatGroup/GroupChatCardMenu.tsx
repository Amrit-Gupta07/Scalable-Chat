"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Delete } from "lucide-react";
import DeleteChatGroup from "./DeleteChatGroup";
import { GroupChatType } from "../../../types";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import EditGroupChat from "./EditGroupChat";
import env from "@/lib/env";
import { toast } from "sonner";

const GroupChatCardMenu = ({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser;
}) => {
  const [editdialog, setEditDialog] = useState(false);
  const [deletedialog, setDeleteDialog] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`${env.APP_URL}/chat/${group.id}`);
    toast.success("Link copied successfully!");
  };
  return (
    <>
      {deletedialog && (
        <DeleteChatGroup
          open={deletedialog}
          setOpen={setDeleteDialog}
          groupId={group.id}
          token={user.token!}
        />
      )}{" "}
      {editdialog && (
        <EditGroupChat
          open={editdialog}
          setOpen={setEditDialog}
          group={group}
          user={user}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsVerticalIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleCopy}>Copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default GroupChatCardMenu;
