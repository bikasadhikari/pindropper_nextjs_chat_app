import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/addFriend";
import { getServerSession } from "next-auth";
import {z} from 'zod';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("Unauthorized", {status: 401})
        }

        const body = await req.json();
        const { email: emailToAdd } = addFriendValidator.parse(body.email);

        const RESTResponse = await fetchRedis('get', `user:email:${emailToAdd}`);

        if (!RESTResponse) {
            return new Response('This person does not exist.', {status: 400});
        }

        if (RESTResponse === session?.user.id) {
            return new Response("You cannot add yourself as friend.", {status: 400});
        }


        //check if user is already added
        const isAlreadyAdded = await fetchRedis('sismember', `user:${RESTResponse}:incoming_friend_requests`, session.user.id) as 0 | 1;
        if (isAlreadyAdded) {
            return new Response(`Already added this user`, {status: 400});
        }

        //check if user is already friend
        const isAlreadyFriends = await fetchRedis('sismember', `user:${session.user.id}:friends`, RESTResponse) as 0 | 1;
        if (isAlreadyFriends) {
            return new Response(`Already friends`, {status: 400});
        }

        //valid request
        db.sadd(`user:${RESTResponse}:incoming_friend_requests`, session.user.id);
        return new Response("OK");

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request payload', {status: 422});
        }

        return new Response("Internal Server Error", {status: 500});
    }
}