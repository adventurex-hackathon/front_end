"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { Calendar, LogOut, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  // Handle redirect in useEffect to avoid render-time side effects
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="from-background via-background to-secondary/20 min-h-screen bg-gradient-to-br p-4">
      <div className="mx-auto max-w-4xl pt-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            Welcome to your Dashboard!
          </h1>
          <p className="text-muted-foreground">
            You&apos;ve successfully authenticated with Supabase.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Information
              </CardTitle>
              <CardDescription>
                Your account details from Supabase Auth
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
              </div>

              {user.user_metadata?.full_name && (
                <div className="flex items-center gap-3">
                  <User className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-muted-foreground text-sm">
                      {user.user_metadata.full_name}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-4 w-4 items-center justify-center">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      user.email_confirmed_at ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Email Status</p>
                  <p className="text-muted-foreground text-sm">
                    {user.email_confirmed_at
                      ? "Verified"
                      : "Pending verification"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authentication Details</CardTitle>
              <CardDescription>
                Technical information about your session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">User ID</p>
                <p className="text-muted-foreground font-mono text-xs break-all">
                  {user.id}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Provider</p>
                <p className="text-muted-foreground text-sm capitalize">
                  {user.app_metadata?.provider || "email"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Last Sign In</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(user.last_sign_in_at || "").toLocaleString()}
                </p>
              </div>

              <Button
                onClick={handleSignOut}
                variant="outline"
                className="mt-4 w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🎉 Authentication Success!</CardTitle>
            <CardDescription>
              Your Supabase authentication is working perfectly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>✅ Email/Password authentication</p>
              <p>✅ OAuth providers (Google & GitHub)</p>
              <p>✅ Session management</p>
              <p>✅ Protected routes</p>
              <p>✅ User context & state</p>
              <p>✅ Automatic redirects</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
