import FloatingBackButton from "@/components/floating-back-button";
import { Icons } from "@/components/icons";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <FloatingBackButton />
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">404</h1>
        <p className="text-sm text-muted-foreground">
          This page could not be found.
        </p>
      </div>
    </div>
  );
}
