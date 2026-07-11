// 'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Card } from '@tremor/react';

const data = [
  {
    date: 'Jan 23',
    Feelings: 1,
  },
  {
    date: 'Feb 23',
    Users: 412,
  },
  {
    date: 'Mar 23',
    Users: 519,
  },
  {
    date: 'Apr 23',
    Users: 642,
  },
  {
    date: 'May 23',
    Users: 642,
  },
  {
    date: 'Jun 23',
    Users: 701,
  },
  {
    date: 'Jul 23',
    Users: 749,
  },
  {
    date: 'Aug 23',
    Users: 961,
  },
  {
    date: 'Sep 23',
    Users: 1286,
  },
  {
    date: 'Oct 23',
    Users: 1491,
  },
  {
    date: 'Nov 23',
    Users: 1619,
  },
  {
    date: 'Dec 23',
    Users: 2019,
  },
];

const valueFormatter = (number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

export default function MoodHistory() {
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Gefühle  im letzten Monat
        </h3>
        <AreaChart
          data={data}
          index="date"
          categories={['Users']}
          showLegend={false}
          showGradient={false}
          valueFormatter={valueFormatter}
          showYAxis={false}
          className="mt-6 hidden h-48 sm:block"
        />
        <AreaChart
          data={data}
          index="date"
          categories={['Feelings']}
          showLegend={false}
          showGradient={false}
          valueFormatter={valueFormatter}
          startEndOnly={true}
          showYAxis={false}
          className="mt-6 h-48 sm:hidden"
        />
      </Card>
    </>
  );
}