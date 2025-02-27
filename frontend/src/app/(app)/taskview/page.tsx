import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

export default function TaskView(){
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
                    <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Filter Section</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content Section</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )
}