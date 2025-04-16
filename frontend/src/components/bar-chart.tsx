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


// chart configuration
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

// all chart items have these attributes
export type ChartDataItem = {
  group: string;
  counts: number;
  fill?: string;
}

// convert into interface to pass to function
interface ChartDataList{
  chartData: ChartDataItem[]
}

export function BarChartComponent({chartData}: ChartDataList) {
  return (
    <div className="text-center min-w-full">
      Task Status Overview
      {/* create chart using the chart config format */}
      <ChartContainer config={chartConfig} className="max-h-[512px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          {/* x-axis configuration */}
          <XAxis
            dataKey="group"
            tickLine={false}
            tickMargin={10}
            axisLine={true}
          />
          <ChartTooltip
          // add on hover tool tip
            cursor={true}
            content={<ChartTooltipContent />}
          />
          {/* y-value is counts */}
          <Bar dataKey="counts" />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
