"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function AuthStatus() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return <div className="bg-muted h-8 w-20 animate-pulse rounded"></div>;
  }

  if (!user) {
    return (
      <Link href="/auth">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">
          {user.user_metadata?.full_name || user.email}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut()}
        className="text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        <span className="sr-only">Sign out</span>
      </Button>
    </div>
  );
}
