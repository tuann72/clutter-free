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

// Array of different views for tasks
const viewOptions = [
  {
    value: "list_view",
    label: "List",
  },
  {
    value: "kanban",
    label: "Kanban",
  },
]

// Array of task progress visualizations
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

// Task object type for formatting and structuring data for tasks
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

    //Fetch tasks when the component mounts
    useEffect(() => {
      fetch("http://localhost:8000/users/" + userEmail + "/tasks")
        .then((res) => res.json())
        .then((data) => {
          setData(data);

          chartData[0].counts = 0;
          chartData[1].counts = 0;
          chartData[2].counts = 0;
    
          //Update chart with fetched data
          data.forEach((task: Task) => {
            if (task.status.toLowerCase() === 'not-started') chartData[0].counts++;
            else if (task.status.toLowerCase() === 'in-progress') chartData[1].counts++;
            else if (task.status.toLowerCase() === 'completed') chartData[2].counts++;
          });
        })
        .catch((err) => console.error("Failed to fetch tasks:", err));
    }, []);
    

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
                        {/* Conditionally render chart of user's choosing for task progress visualization */}
                        {graphOptions.find((option) => option.value === graph)?.label || "Select a graph!"}
                      </div>
                      {graph === "pie_chart" && <PieChartComponent chartData={chartData}/>}
                      {graph === "bar_chart" && <BarChartComponent chartData={chartData}/>}
                      {graph === "radar_chart" && <RadarChartComponent chartData={chartData}/>}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={25}>
                  {/* Allow users to select different charts and task views */}
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
                {/* Conditionally render task view of user's choosing */}
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