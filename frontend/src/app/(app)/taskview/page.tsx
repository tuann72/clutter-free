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

export default function TaskView(){

    const [view, setView] = useState("list_view")
    const [graph, setGraph] = useState("bar")

    return(
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-screen max-w-full"
        >
          <ResizablePanel defaultSize={25}>
            <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Graph Section</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={50}>
                    <div className="flex flex-col h-full items-center p-6">
                    <div className="font-semibold pb-4">Filter Section</div>
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
              <div>
                {viewOptions.find((option) => option.value === view)?.label || "Select a view!"}
              </div>
              {
                view === "list_view" && <ListView />
              }
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )
}