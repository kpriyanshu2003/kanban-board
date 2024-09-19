import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid place-items-center gap-44 my-32">
      <div>
        <Link href="/" className="text-5xl font-extrabold">
          The Kanban
        </Link>
      </div>
      <div className="leading-loose grid gap-8">
        <div>
          This is a proof-of-concept Kanban and TaskList created by{" "}
          <Link
            href="https://github.com/kpriyanshu2003"
            className="text-blue-600 font-medium"
          >
            ME
          </Link>{" "}
          for an internship assignment.
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Link href="/kanban">
            <Button variant="default" className="bg-black text-white py-6 w-40">
              Get Started
            </Button>
          </Link>
          <Link href="https://github.com/kpriyanshu2003/kanban-board">
            <Button color="default" variant="outline" className="py-6 w-40">
              Github Repo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
