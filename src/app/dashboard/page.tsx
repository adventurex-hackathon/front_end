"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  // Handle redirect in useEffect to avoid render-time side effects
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard!</h1>
          <p className="text-muted-foreground">
            You&apos;ve successfully authenticated with Supabase.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Information
              </CardTitle>
              <CardDescription>
                Your account details from Supabase Auth
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              {user.user_metadata?.full_name && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">
                      {user.user_metadata.full_name}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${
                    user.email_confirmed_at ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Email Status</p>
                  <p className="text-sm text-muted-foreground">
                    {user.email_confirmed_at ? 'Verified' : 'Pending verification'}
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
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {user.id}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Provider</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {user.app_metadata?.provider || 'email'}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Last Sign In</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(user.last_sign_in_at || '').toLocaleString()}
                </p>
              </div>

              <Button 
                onClick={handleSignOut} 
                variant="outline" 
                className="w-full mt-4"
              >
                <LogOut className="w-4 h-4 mr-2" />
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
