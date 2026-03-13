export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="viewport-fix min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
