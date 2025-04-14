import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

// creates attributes for task dialogs
type TaskDialogProps = {
  t_id : number
  t_name : string
  est : number
  intense: number
  categ: string
  stat: string
  // we'll need to pass a function as well to set the open/close status of the dialog box
  setOpen: (open: boolean) => void
  showDialog: boolean;
};

export function TaskDialog({t_id, showDialog, setOpen, t_name, est, intense, categ, stat} : TaskDialogProps) {
  //const oldTaskName = t_name

  // variables to stores all parameters passed
  const [taskID, setTaskID] = useState(t_id);
  const [taskName, setTaskName] = useState(t_name);
  const [estimate, setEstimate] = useState(est);
  const [intensity, setIntensity] = useState(intense);
  const [category, setCategory] = useState(categ);
  const [status, setStatus] = useState(stat);

  // when t_id,t_name,est,intense,categ,stat is changed, useEffect updates those values
  useEffect(() => {
    setTaskID(t_id)
    setTaskName(t_name)
    setEstimate(est)
    setIntensity(intense)
    setCategory(categ)
    setStatus(stat.toLowerCase())
  }, [t_id,t_name,est,intense,categ,stat])

  // function to handle task edits
  const handleUpdates = async () => {
    console.log(taskID)
    console.log(taskName)
    console.log(estimate)
    console.log(intensity)
    console.log(category)
    console.log(status)

    // use this to find task
    //console.log(oldTaskName)

    setOpen(false)

    try {
      const newUpdates = {
        task: taskName,
        estimate: estimate,
        intensity: intensity,
        category: category,
        status: status,
      };
      
      // Update the specific task with new values
      const response = await fetch(`http://localhost:8000/tasks/${taskID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUpdates),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
  
      const result = await response.json();
      console.log(result.message); // Task updated successfully!

      // refresh the page to see the changes
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  return (
    // open dialog if showDIalog is true
    <Dialog open={showDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* title */}
          <DialogTitle>Edit Task</DialogTitle>
          {/* description */}
          <DialogDescription>
            Make changes to your task. Click save changes when you are done.
          </DialogDescription>
          {/* add X to the top right to close the dialog */}
          <div onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-sm cursor-pointer">
            <X className="h-4 w-4" />
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* task name field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task Name
            </Label>
            <Input
              id="taskName"
              // default value is whatever the user had intitially
              defaultValue={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="col-span-3"
            />
          </div>
          {/* estimate time field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimate" className="text-right">
              Estimate (in minutes)
            </Label>
            <Input
              id="estimate"
              // default value is whatever the user had intitially 
              defaultValue={estimate}
              onChange={(e) => setEstimate(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          {/* intensity field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="intensity" className="text-right">
              Intensity
            </Label>
            {/* <Input
              id="intensity"
              defaultValue={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="col-span-3"
            /> */}
            {/* default value is whatever the user had intitially  */}
            {/* in this case we use a select component to limit user options */}
            <Select defaultValue={String(intense)} onValueChange={(value)=> setIntensity(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Intensity"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* category field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            {/* <Input
              id="category"
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
              className="col-span-3"
            /> */}
            {/* default value is whatever the user had intitially  */}
            {/* in this case we use a select component to limit user options */}
            <Select defaultValue={categ} onValueChange={(value)=> setCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* status field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            {/* <Input
              id="status"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
              className="col-span-3"
            /> */}
            {/* default value is whatever the user had intitially  */}
            {/* in this case we use a select component to limit user options */}
            <Select defaultValue={status} onValueChange={(value)=>setStatus(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="not-started">not-started</SelectItem>
                  <SelectItem value="in-progress">in-progress</SelectItem>
                  <SelectItem value="completed">completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* save changes button at the footer */}
        <DialogFooter>
          <Button type="submit" onClick={handleUpdates}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
