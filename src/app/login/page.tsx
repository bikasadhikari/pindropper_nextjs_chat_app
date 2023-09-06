"use client";

import Button from "@/components/ui/Button";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from 'react-hot-toast';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
        await signIn('google');
    } catch (error) {
        //display error message to user
        toast.error("Something went wrong with login!");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            logo
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <Button
            isLoading={isLoading}
            className="max-w-sm mx-auto w-full"
            onClick={loginWithGoogle}
          >
            {isLoading ? null : (
              <svg viewBox="0 0 48 48" width={20} height={20}>
                <title>Google Logo</title>
                <clipPath id="g">
                  <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                </clipPath>
                <g clipPath="url(#g)">
                  <path fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                  <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                  <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                </g>
              </svg>
            )}
            &nbsp;Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
