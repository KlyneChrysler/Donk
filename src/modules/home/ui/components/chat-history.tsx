"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

export const ChatHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCount, setShowCount] = useState(6);

  const trpc = useTRPC();
  const { data: messages } = useQuery(trpc.messages.getMessages.queryOptions());

  const filteredMessages = useMemo(() => {
    if (!messages) return [];
    if (!searchTerm.trim()) return messages;

    return messages.filter((message) =>
      message.content.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [messages, searchTerm]);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const clearSearch = () => setSearchTerm("");

  return (
    <div className="w-full bg-transparent dark:bg-sidebar rounded-xl p-8 flex flex-col gap-y-6 sm:gap-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl sm:text-6xl font-caladea ">Chats</h2>
        <Button variant={"outline"} asChild className="h-auto p-2.5 rounded-lg">
          <Link href="/">
            <Plus className="w-6 h-6" />
            <h2 className="text-sm sm:text-md">New Chat</h2>
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search your chats..."
          value={deferredSearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 py-5 bg-sidebar border-muted focus-visible:border-muted-foreground focus-visible:ring-0"
        />

        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div>
        <p className="text-sm sm:text-md">
          You have {filteredMessages.length} previous chats with Donk
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredMessages?.length === 0 && !deferredSearchTerm && (
          <div className="col-span-full text-center">
            <p className="text-2xl sm:text-3xl ">No Chat History</p>
          </div>
        )}
        {filteredMessages?.length === 0 && deferredSearchTerm && (
          <div className="col-span-full text-center">
            <p className="text-md sm:text-lg break-words">
              There are 0 chats matching &quot;
              {deferredSearchTerm.toLowerCase()}&quot;
            </p>
            <Button variant="outline" onClick={clearSearch} className="mt-2">
              Clear search
            </Button>
          </div>
        )}
        {filteredMessages.slice(0, showCount).map((message) => (
          <Button
            key={message.id}
            variant={"outline"}
            className="h-auto bg-muted justify-start w-full rounded-2xl text-start p-4"
            asChild
          >
            <Link href={`/projects/${message.projectId}`}>
              <div className="flex items-center gap-x-4 w-full ">
                <div className="flex flex-col gap-8 min-w-0 flex-1">
                  <h3 className="truncate text-lg">{message.content}</h3>

                  <p className="text-sm text-muted-foreground">
                    Last message{" "}
                    {formatDistanceToNow(message.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>

      {filteredMessages.length > showCount && (
        <Button
          variant="outline"
          onClick={() => setShowCount((prev) => prev + 10)}
          className="self-center"
        >
          Show More
        </Button>
      )}
    </div>
  );
};
