import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "w-full",
            },
          }}
        />
      </div>
    </div>
  );
}