"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// const chartData = [
//   { group: "not-started", counts: 2},
//   { group: "in-progress", counts: 4, fill: "hsl(62 0% 32%)" },
//   { group: "completed", counts: 1, fill: "hsl(192 19% 48%)" },
// ]

const chartConfig = {
  notstarted: {
    label: "not-started",
  },
  inprogress: {
    label: "in-progress",
  },
  completed_: {
    label: "completed",
  },

} satisfies ChartConfig

export type ChartDataItem = {
  group: string;
  counts: number;
  fill?: string;
}

interface ChartDataList{
  chartData: ChartDataItem[]
}

export function BarChartComponent({chartData}: ChartDataList) {
  return (
    <div className="text-center min-w-full">
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="group"
            tickLine={false}
            tickMargin={10}
            axisLine={true}
          />
          <ChartTooltip
            cursor={true}
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="counts" />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
