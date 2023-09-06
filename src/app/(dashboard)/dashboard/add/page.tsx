import AddFriendButton from "@/components/ui/AddFriendButton";
import { FC } from "react";

interface PageProps {};

const Page: FC<PageProps> = ({}) => {
    return (
        <main className="pt-5">
            <h1 className="font-bold text-4xl text-gray-700 mb-8">Add a friend</h1>
            <AddFriendButton />
        </main>
    )
}

export default Page;