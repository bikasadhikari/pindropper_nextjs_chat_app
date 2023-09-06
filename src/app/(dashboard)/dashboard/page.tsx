import Button from "@/components/ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";

interface PageProps {};

const Page: FC<PageProps> = async ({}) => {

    const session = await getServerSession(authOptions);

    return <div>
        {JSON.stringify(session)}
    </div>
};` `

export default Page;