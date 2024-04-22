import { Button } from "@/components/ui/button";

export default async function PollPage() {
  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Polls</h2>
        </div>
        <Button>Create Poll</Button>
      </div>
    </>
  );
}
