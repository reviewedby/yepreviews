"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { FeedbackStatus } from "@/types";

interface Props {
  feedbackId: string;
  currentStatus: FeedbackStatus;
}

export function UpdateFeedbackStatus({ feedbackId, currentStatus }: Props) {
  const router = useRouter();

  async function setStatus(status: FeedbackStatus) {
    const supabase = createClient();
    await supabase.from("feedback").update({ status }).eq("id", feedbackId);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      {currentStatus !== "followed_up" && (
        <button
          onClick={() => setStatus("followed_up")}
          className="px-4 py-2 bg-good text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
        >
          Mark followed up
        </button>
      )}
      {currentStatus === "followed_up" && (
        <button
          onClick={() => setStatus("read")}
          className="px-4 py-2 bg-ink-05 text-ink-60 font-medium rounded-xl text-sm hover:bg-ink-10 transition-colors"
        >
          Reopen
        </button>
      )}
      <span
        className="text-xs font-medium px-2.5 py-1.5 rounded-full"
        style={{
          background: currentStatus === "followed_up" ? "#e3f6ee" : currentStatus === "new" ? "#eeeefe" : "#f4f5f7",
          color: currentStatus === "followed_up" ? "#12a66a" : currentStatus === "new" ? "#5a5af0" : "#5b5f6e",
        }}
      >
        {currentStatus === "new" ? "New" : currentStatus === "read" ? "Read" : "Followed up"}
      </span>
    </div>
  );
}
