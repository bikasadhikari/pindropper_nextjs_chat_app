import FriendRequests from "@/components/ui/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  //ids of people who sent the current logged in user friend request
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = JSON.parse((await fetchRedis("get", `user:${senderId}`)) as string) as User;
      return {
        senderId,
        senderEmail: sender.email,
      };
    })
  );

  return (
    <main className="pt-5">
      <h1 className="font-bold text-4xl text-gray-700 mb-8">Friend requests</h1>

      <div className="flex flex-col gap-4">
        <FriendRequests incomingFriendRequests={incomingFriendRequests} />
      </div>
    </main>
  );
};

export default Page;
