"use client";

import { useState } from "react";
import type { BusinessPublic, Employee, Platform } from "@/types";
import { YepMark } from "@/components/yep-mark";
import { Avatar } from "@/components/avatar";
import { RatingScreen } from "./rating-screen";
import { PositiveScreen } from "./positive-screen";
import { NegativeScreen } from "./negative-screen";
import { ThanksScreen } from "./thanks-screen";

type Screen = "rating" | "positive" | "negative" | "thanks-positive" | "thanks-negative";

interface ReviewFlowProps {
  business: BusinessPublic;
  employee: Employee | null;
}

export function ReviewFlow({ business, employee }: ReviewFlowProps) {
  const [screen, setScreen] = useState<Screen>("rating");
  const [rating, setRating] = useState(0);

  function handleStarSelect(star: number) {
    setRating(star);
    if (star >= business.star_threshold) {
      setScreen("positive");
    } else {
      setScreen("negative");
    }
  }

  function handleFeedbackSubmit() {
    setScreen("thanks-negative");
  }

  function handlePlatformClick() {
    setScreen("thanks-positive");
  }

  return (
    <div className="min-h-screen bg-ink-05 flex flex-col items-center justify-center p-4">
      <div
        className="w-full bg-paper flex flex-col overflow-hidden"
        style={{
          maxWidth: 390,
          minHeight: "100svh",
          borderRadius: 0,
          boxShadow: "none",
        }}
      >
        {screen === "rating" && (
          <RatingScreen
            business={business}
            employee={employee}
            onStarSelect={handleStarSelect}
          />
        )}
        {screen === "positive" && (
          <PositiveScreen
            business={business}
            employee={employee}
            rating={rating}
            onPlatformClick={handlePlatformClick}
          />
        )}
        {screen === "negative" && (
          <NegativeScreen
            business={business}
            employee={employee}
            rating={rating}
            onSubmit={handleFeedbackSubmit}
          />
        )}
        {(screen === "thanks-positive" || screen === "thanks-negative") && (
          <ThanksScreen
            business={business}
            employee={employee}
            positive={screen === "thanks-positive"}
          />
        )}
      </div>
    </div>
  );
}
