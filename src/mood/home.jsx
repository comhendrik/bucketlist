import { useEffect, useState } from "react";
import { Card, Title, Text } from "@tremor/react";
import {
  Smile,
  Laugh,
  Meh,
  Frown,
  Angry,
} from "lucide-react";
import MoodService from "../services/MoodService";
import MoodHistory from "./moodHistory";

const moods = [
  {
    id: 5,
    label: "Great",
    icon: Laugh,
    color: "bg-green-500",
  },
  {
    id: 4,
    label: "Good",
    icon: Smile,
    color: "bg-lime-500",
  },
  {
    id: 3,
    label: "Okay",
    icon: Meh,
    color: "bg-yellow-400",
  },
  {
    id: 2,
    label: "Bad",
    icon: Frown,
    color: "bg-orange-500",
  },
  {
    id: 1,
    label: "Terrible",
    icon: Angry,
    color: "bg-red-500",
  },
];

export default function MoodCheckIn() {
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMood = async () => {
      const exists = await MoodService.hasMoodForToday();
      setHasCheckedInToday(exists);
      setLoading(false);
    };

    checkMood();
  }, []);

  const handleMoodClick = async (level) => {
    await MoodService.createMood(level);
    setHasCheckedInToday(true);
  };


  //TODO: Allgemeine Loadingkomponente bauen

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <Card>
          <Text>Loading...</Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card>
        <Title>🌤 Daily Mood Check-In</Title>

        {hasCheckedInToday ? (
          <Text className="mt-4 text-green-600 font-medium">
            ✅ You have already checked in today. Come back tomorrow!
          </Text>
        ) : (
          <>
            <Text className="mt-2">
              How are you feeling today?
            </Text>

            <div className="grid grid-cols-5 gap-4 mt-8">
              {moods.map((mood) => {
                const Icon = mood.icon;

                return (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodClick(mood.id)}
                    className={`
                      rounded-xl p-4 transition-all duration-200
                      flex flex-col items-center gap-3
                      text-white shadow-sm
                      ${mood.color}
                    `}
                  >
                    <Icon size={36} strokeWidth={2.2} />
                    <span className="text-sm font-medium">
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
        <MoodHistory></MoodHistory>
      </Card>
    </div>
  );
}