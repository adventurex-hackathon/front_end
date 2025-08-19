export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout removes the navbar and container constraints
  // The root layout still provides html, body, fonts, and theme provider
  return <>{children}</>;
}
