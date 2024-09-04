"use client";
import Link from "next/link";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/darkmodeToggle";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Rate My Professor AI! 🌁
        </h1>
      </div>

      <div>
        <Link href="/rmp">
          <Button
            variant="outline"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Continue
          </Button>
        </Link>
      </div>
      <div>
        <ModeToggle />
      </div>
    </main>
  );
}
