"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "not-started", counts: 2, fill: "hsl(59 5% 53%)" },
  { browser: "in-progress", counts: 4, fill: "hsl(57 100% 53%)" },
  { browser: "completed", counts: 1, fill: "hsl(108 51.7% 34.1%)" },
]

const chartConfig = {
  notstarted: {
    label: "not-started",
    color: "hsl(var(--chart-1))",
  },
  inprogress: {
    label: "in-progress",
    color: "hsl(var(--chart-2))",
  },
  completed_: {
    label: "completed",
    color: "hsl(var(--chart-3))",
  },

} satisfies ChartConfig

export function PieChartComponent() {
  return (
        <div className="text-center min-w-full">
            <div>
                <div>
                    Pie Chart
                </div>
                <div>
                    Task View Status
                </div>
            </div>
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
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
    </div>
  )
}
