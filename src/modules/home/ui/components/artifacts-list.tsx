"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";

export const ArtifactsList = () => {
  const trpc = useTRPC();
  const { data: messages } = useQuery(
    trpc.messages.getFragments.queryOptions()
  );

  const totalFragments = messages?.reduce((count, msg) => {
    const files = msg.fragment?.files || {};
    return count + Object.keys(files).length;
  }, 0);

  return (
    <div className="w-full bg-transparent dark:bg-sidebar rounded-xl p-8 flex flex-col gap-y-6 sm:gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl sm:text-6xl font-caladea ">Artifacts</h2>
        <Button variant={"outline"} asChild className="h-auto p-2.5 rounded-lg">
          <Link href="/">
            <Plus className="w-6 h-6" />
            <h2 className="text-sm sm:text-md">New Artifact</h2>
          </Link>
        </Button>
      </div>

      <div>
        <div className="text-sm sm:text-md line-clamp-1">
          You have {totalFragments} artifacts with Donk
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {totalFragments === 0 ? (
          <div className="col-span-full text-center">
            <p className="text-2xl sm:text-3xl ">No Artifacts Found</p>
          </div>
        ) : (
          <></>
        )}
        {messages?.map((msg) => (
          <div key={msg.id}>
            <Button
              variant={"outline"}
              className="h-auto bg-muted justify-start w-full rounded-2xl text-start p-4"
              asChild
            >
              <div className="flex items-center gap-x-4 w-full">
                <div className="flex flex-col gap-8 min-w-0 w-3/4 relative left-8 top-4">
                  {msg.fragment?.files &&
                    Object.entries(
                      msg.fragment.files as Record<string, string>
                    ).map(([filename, content]) => (
                      <div
                        key={filename}
                        className="mt-2 transition-transform duration-300 hover:-translate-y-4 hover:rotate-2"
                      >
                        <h4 className="font-mono text-xs bg-sidebar text-primary px-2 py-1 rounded-t-md line-clamp-6">
                          {filename}
                        </h4>
                        <pre className="bg-black text-green-400 text-xs p-2 overflow-x-auto line-clamp-6 overflow-y-auto">
                          {content}
                        </pre>
                      </div>
                    ))}
                </div>
              </div>
            </Button>
            <div className="pl-1">
              {msg.fragment?.files &&
                Object.entries(
                  msg.fragment.files as Record<string, string>
                ).map(([filename]) => (
                  <div key={filename} className="mt-2">
                    <h4 className="text-md truncate">{msg.fragment?.title}</h4>
                  </div>
                ))}
              <div>
                {msg.fragment?.updatedAt ? (
                  <p className="mt-1 text-xs">
                    {"Last edited "}
                    {formatDistanceToNow(new Date(msg.fragment.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                ) : (
                  "No date"
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
