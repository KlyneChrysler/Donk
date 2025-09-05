"use client";

import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Plus,
  LogIn,
  UserRoundPlus,
  SquareLibrary,
  MessageCircleDashed,
  Eclipse,
  Origami,
} from "lucide-react";
import { Hint } from "@/components/hint";

export const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-0 h-12 lg:h-full w-full lg:w-12 z-50 flex flex-row lg:flex-col">
      <div className="flex-1 flex flex-row lg:flex-col items-start lg:items-center space-y-6 pt-3 p-4 gap-4 lg:gap-0">
        <Link href="/">
          <Hint text="New Chat" side="right">
            <Button className="rounded-full size-6 bg-primary hover:bg-primary/90 p-1 flex items-center justify-center">
              <Plus className="text-primary-foreground" />
            </Button>
          </Hint>
        </Link>
        <Link href="/chats">
          <SignedIn>
            <Hint text="Chats" side="right">
              <MessageCircleDashed
                className="text-muted-foreground hover:text-primary"
                strokeWidth={1.5}
              />
            </Hint>
          </SignedIn>
        </Link>
        <Link href="/projects">
          <SignedIn>
            <Hint text="Projects" side="right">
              <SquareLibrary
                className="text-muted-foreground hover:text-primary"
                strokeWidth={1.5}
              />
            </Hint>
          </SignedIn>
        </Link>
        <Link href="/artifacts">
          <SignedIn>
            <Hint text="Artifacts" side="right">
              <Origami
                className="text-muted-foreground hover:text-primary"
                strokeWidth={1.5}
              />
            </Hint>
          </SignedIn>
        </Link>
        <Link href="/themes">
          <Hint text="Themes" side="right">
            <Eclipse
              className="text-muted-foreground hover:text-primary"
              strokeWidth={1.5}
            />
          </Hint>
        </Link>
      </div>

      <div className="p-4 pt-2.5 flex justify-center">
        <SignedOut>
          <div className="flex flex-row lg:flex-col gap-2">
            <Hint text="Sign Up" side="right">
              <SignUpButton>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                  <UserRoundPlus />
                </Button>
              </SignUpButton>
            </Hint>
            <Hint text="Sign In" side="right">
              <SignInButton>
                <Button size="sm" className="w-8 h-8 p-0">
                  <LogIn />
                </Button>
              </SignInButton>
            </Hint>
          </div>
        </SignedOut>
        <SignedIn>
          <div>
            <UserControl showName={false} />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};
