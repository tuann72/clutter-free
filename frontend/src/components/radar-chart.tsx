"use client"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// const chartData = [
//     { group: "not-started", counts: 2},
//     { group: "in-progress", counts: 4},
//     { group: "completed", counts: 1},
//   ]

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

// chart item attributes
export type ChartDataItem = {
  group: string;
  counts: number;
  fill?: string;
}
// typing interface
interface ChartDataList{
  chartData: ChartDataItem[]
}

export function RadarChartComponent({chartData} : ChartDataList) {
  return (
    <div className="text-center min-w-full">
        Task Status Overview
        <ChartContainer
            config={chartConfig}
            className="mx-auto max-h-[512px]"
        >
          {/* create radar chart */}
            <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="group" />
            <PolarGrid />
            {/* use counts as values */}
            <Radar
                dataKey="counts"
                fill="hsl(192 19% 48%)"
                fillOpacity={0.6}
                dot={{
                r: 4,
                fillOpacity: 1,
                }}
            />
            </RadarChart>
        </ChartContainer>
    </div>
  )
}
