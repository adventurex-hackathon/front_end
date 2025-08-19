"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function AuthStatus() {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>;
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
        <User className="w-4 h-4" />
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
        <LogOut className="w-4 h-4" />
        <span className="sr-only">Sign out</span>
      </Button>
    </div>
  );
}
