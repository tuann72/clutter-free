'use client'
import { TaskViewComboBox } from "@/components/taskviewComboBox"
import { GraphViewComboBox } from "@/components/graphComboBox"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

import { ListView } from "@/components/listView"
import { useState } from "react"
import { PieChartComponent } from "@/components/pie-chart"
import { BarChartComponent } from "@/components/bar-chart"
import { RadarChartComponent } from "@/components/radar-chart"

const viewOptions = [
  {
    value: "list_view",
    label: "List",
  },
  {
    value: "kanban",
    label: "Kanban",
  },
  {
    value: "mindmap",
    label: "Mindmap",
  },
]

const graphOptions = [
  {
    value: "pie_chart",
    label: "Pie Chart"
  },
  {
    value: "bar_chart",
    label: "Bar Chart"
  },
  {
    value: "radar_chart",
    label: "Radar Chart"
  },
]

const data: Task[] = [
  {
    category: "Work",
    estimate: 100,
    intensity: 2,
    status: "in progress",
    task: "Create AI Model",
  },
  {
    category: "Health",
    estimate: 60,
    intensity: 3,
    status: "in progress",
    task: "Go to Hike",
  },
  {
    category: "Growth",
    estimate: 5,
    intensity: 1,
    status: "not started",
    task: "Meditate",
  },
]

export type Task = {
  category: "Work" | "Health" | "Home" | "Growth" | "Social"
  estimate: number
  intensity: number
  status: "not started" | "in progress" | "completed"
  task: string
}

export default function TaskView(){
    

    const [view, setView] = useState("list_view")
    const [graph, setGraph] = useState("pie_chart")

    return(
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-screen max-w-full"
        >
          <ResizablePanel defaultSize={25}>
            <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={75}>
                    <div className="flex flex-col h-full items-center justify-center p-6">
                      <div className="font-semibold">
                        {graphOptions.find((option) => option.value === graph)?.label || "Select a graph!"}
                      </div>
                      {graph === "pie_chart" && <PieChartComponent/>}
                      {graph === "bar_chart" && <BarChartComponent/>}
                      {graph === "radar_chart" && <RadarChartComponent/>}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={25}>
                    <div className="flex flex-col h-full items-center p-6">
                    <div className="font-semibold pb-4">Style</div>
                      <div className="flex flex-col lg:flex-row gap-2">
                        <GraphViewComboBox value={graph} onValueChange={setGraph} />
                        <TaskViewComboBox value={view} onValueChange={setView} />
                      </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex flex-col h-full items-center justify-center p-6">
              <div className="font-semibold">
                {viewOptions.find((option) => option.value === view)?.label || "Select a view!"}
              </div>
              {
                view === "list_view" && <ListView data={data} />
              }
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )
}