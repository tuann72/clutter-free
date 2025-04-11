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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

type TaskDialogProps = {
  t_name : string
  est : number
  intense: number
  categ: string
  stat: string
  setOpen: (open: boolean) => void
  showDialog: boolean;
};

export function TaskDialog({showDialog, setOpen, t_name, est, intense, categ, stat} : TaskDialogProps) {
  const [taskName, setTaskName] = useState(t_name);
  const [estimate, setEstimate] = useState(est);
  const [intensity, setIntensity] = useState(intense);
  const [category, setCategory] = useState(categ);
  const [status, setStatus] = useState(stat);

  useEffect(() => {
    setTaskName(t_name)
    setEstimate(est)
    setIntensity(intense)
    setCategory(categ)
    setStatus(stat)
  })

  const handleUpdates = () => {

    // insert post here

    setOpen(false)
  }

  return (
    <Dialog open={showDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task. Click save changes when you are done.
          </DialogDescription>
          <div onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-sm cursor-pointer">
            <X className="h-4 w-4" />
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task Name
            </Label>
            <Input
              id="taskName"
              defaultValue={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Estimate
            </Label>
            <Input
              id="estimate"
              defaultValue={estimate}
              onChange={(e) => setEstimate(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Intensity
            </Label>
            <Input
              id="intensity"
              defaultValue={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Status
            </Label>
            <Input
              id="status"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleUpdates}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
