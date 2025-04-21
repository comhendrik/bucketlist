import { Card, Text, Flex, Title, DonutChart, CategoryBar } from "@tremor/react";

const Analytics = ({ data }) => {

  return (
    <Card className="mb-4 bg-gradient-to-r from-slate-100 to-slate-200 shadow-md rounded-2xl">
      

      <CategoryBar values={[55,30]} className="mx-auto max-w-sm" />


    </Card>
  );
};

export default Analytics;
