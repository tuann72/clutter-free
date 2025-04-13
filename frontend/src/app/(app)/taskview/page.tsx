'use client'
import { TaskViewComboBox } from "@/components/taskviewComboBox"
import { GraphViewComboBox } from "@/components/graphComboBox"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

import { ListView } from "@/components/listView"
import { useState, useEffect } from "react"
import { PieChartComponent } from "@/components/pie-chart"
import { BarChartComponent } from "@/components/bar-chart"
import { RadarChartComponent } from "@/components/radar-chart"
import { useUserInfo } from '@/context/UserContext';

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
]

const chartData = [
  { group: "not-started", counts: 0},
  { group: "in-progress", counts: 0, fill: "hsl(62 0% 32%)" },
  { group: "completed", counts: 0, fill: "hsl(192 19% 48%)" },
]

export type Task = {
  id: number
  category: "Work" | "Health" | "Home" | "Growth" | "Social"
  estimate: number
  intensity: number
  status: "not-started" | "in-progress" | "completed"
  task: string
}

export default function TaskView(){
    const [view, setView] = useState("list_view")
    const [graph, setGraph] = useState("pie_chart")
    const [data, setData] = useState<Task[]>([])
    const userInfo = useUserInfo();

    const userEmail = userInfo?.email;

    useEffect(() => {
      fetch("http://localhost:5000/users/" + userEmail + "/tasks")
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error("Failed to fetch tasks:", err))
    }, [])

    useEffect(() => {
      chartData[0].counts = 0
      chartData[1].counts = 0
      chartData[2].counts = 0

      data.forEach((task) => {
        if(task.status == 'not-started'){
          chartData[0].counts++}
        else if(task.status == 'in-progress'){
          chartData[1].counts++}
        else if(task.status == 'completed'){
          chartData[2].counts++}
      })
    })
    

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
                      {graph === "pie_chart" && <PieChartComponent chartData={chartData}/>}
                      {graph === "bar_chart" && <BarChartComponent chartData={chartData}/>}
                      {graph === "radar_chart" && <RadarChartComponent chartData={chartData}/>}
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