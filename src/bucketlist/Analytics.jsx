import { Card, Title, CategoryBar } from "@tremor/react";

const Analytics = ({ data }) => {
  const doneCount = data.filter((item) => item.done).length;
  const notDoneCount = data.length - doneCount;

  return (
    <Card className="mb-4 bg-gradient-to-r from-slate-100 to-slate-200 shadow-md rounded-2xl p-4">
      <Title className="text-lg font-semibold text-center mb-2">
        Progress Overview: Done vs Not Done
      </Title>

      <CategoryBar
        values={[doneCount, notDoneCount]}
        colors={["emerald", "rose"]}
        className="mx-auto max-w-sm"
      />

      <div className="flex justify-between max-w-sm mx-auto mt-2 text-sm text-gray-700">
        <span>✅ Done: {doneCount}</span>
        <span>❌ Not Done: {notDoneCount}</span>
      </div>
    </Card>
  );
};

export default Analytics;
