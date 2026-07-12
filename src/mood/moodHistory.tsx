// 'use client';

import { useEffect, useState } from "react";
import { AreaChart, Card } from "@tremor/react";
import MoodService from "../services/MoodService";

const valueFormatter = (value: number) => value.toString();

export default function MoodHistory() {
  const [data, setData] = useState<
    {
      date: string;
      Feelings: number;
    }[]
  >([]);

  useEffect(() => {
    const loadHistory = async () => {
      const moods = await MoodService.getMonthlyHistoricalData();

      const chartData = moods.map((mood) => ({
        date: mood.created.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        Feelings: mood.level,
      }));

      setData(chartData);
    };

    loadHistory();
  }, []);

  return (
    <Card className="sm:mx-auto sm:max-w-lg">
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Gefühle im letzten Monat
      </h3>

      <AreaChart
        data={data}
        index="date"
        categories={["Feelings"]}
        showLegend={false}
        showGradient={false}
        valueFormatter={valueFormatter}
        minValue={1}
        maxValue={5}
        yAxisWidth={30}
        showYAxis={true}
        className="mt-6 h-48"
      />
    </Card>
  );
}