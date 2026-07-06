import { useState } from "react";
import { Card, Title, Text } from "@tremor/react";
import {
  Smile,
  Laugh,
  Meh,
  Frown,
  Angry,
} from "lucide-react";

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
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card>
        <Title>🌤 Daily Mood Check-In</Title>
        <Text className="mt-2">
          How are you feeling today?
        </Text>

        <div className="grid grid-cols-5 gap-4 mt-8">
          {moods.map((mood) => {
            const Icon = mood.icon;

            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`
                  rounded-xl p-4 transition-all duration-200
                  flex flex-col items-center gap-3
                  text-white shadow-sm
                  ${mood.color}
                  ${
                    selectedMood === mood.id
                      ? "ring-4 ring-blue-500 scale-105"
                      : "hover:scale-105"
                  }
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

        {selectedMood && (
          <Card className="mt-8 bg-slate-50">
            <Text>
              Today's mood:{" "}
              <span className="font-semibold">
                {moods.find((m) => m.id === selectedMood)?.label}
              </span>
            </Text>
          </Card>
        )}
      </Card>
    </div>
  );
}