import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GroupChatType } from "../../../types";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
const GroupChatCard = ({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">{group.title}</CardTitle>
        <GroupChatCardMenu group={group} user={user} />
      </CardHeader>
      <CardContent>
        <p>
          Passcode :-<strong>{group.passcode}</strong>
        </p>
        <p>Created At :-{new Date(group.created_at).toDateString()}</p>
      </CardContent>
    </Card>
  );
};

export default GroupChatCard;
