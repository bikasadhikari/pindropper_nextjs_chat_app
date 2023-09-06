"use client"
import { FC, useState } from "react";
import { Icons } from "../Icons";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FriendRequestsProps {
    incomingFriendRequests: IncomingFriendRequest[],
};

const FriendRequests: FC<FriendRequestsProps> = ({incomingFriendRequests}) => {
    const router = useRouter();
    const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(incomingFriendRequests);

    const acceptFriend = async (senderId: string) => {
        await axios.post("/api/requests/accept", {id: senderId})

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId));
        router.refresh();
    }

    const denyFriend = async (senderId: string) => {
        await axios.post("/api/requests/deny", {id: senderId})

        setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId));
        router.refresh();
    }

    return <>
        {
            friendRequests.length === 0 ? (
                <p className="text-zinc-500 text-xm">No friend requests..</p>
            ) : (
                <>{
                    friendRequests.map((request) => (
                        <div key={request.senderId} className="flex gap-4 items-center">
                            <Icons.UserPlus className="text-zinc-500" />
                            <p className="text-zinc-600">{request.senderEmail}</p>
                            <button onClick={() => acceptFriend(request.senderId)} aria-label="accept friend" className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-medium">
                                <Icons.Check className="semi-bold text-white w-3/4 h-3/4" />
                            </button>

                            <button onClick={() => denyFriend(request.senderId)} aria-label="deny friend" className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-medium">
                                <Icons.X className="semi-bold text-white w-3/4 h-3/4" />
                            </button>
                        </div>
                    ))
                }</>
            )
        }
    </>;
}   

export default FriendRequests;