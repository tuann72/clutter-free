"use client"

import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// const chartData = [
//   { group: "not-started", counts: 2 },
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

export function PieChartComponent({chartData} : ChartDataList) {
  return (
      <div className="text-center min-w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="counts" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="counts"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {payload.counts}
                  </text>
                )
              }}
              nameKey="group"
            />
          </PieChart>
        </ChartContainer>
    </div>
  )
}
