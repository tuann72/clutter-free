import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// creates attributes for delete dialog
type DeleteDialogBox = {
    // we'll need to pass a function as well to set the open/close status of the dialog box
    setOpen: (open: boolean) => void
    // we pass confirm option to confirm that we do want to delete task
    setConfirm: (open: boolean) => void
    showDialog: boolean;
    // holds the strings for task
    tasks : string[];
  };

export function ConfirmDelete({setOpen, setConfirm, showDialog, tasks} : DeleteDialogBox) {

  return (
    <Dialog open={showDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete the following task(s): </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-4">
            {
                // for each task we create a label for it
                tasks.map((item) => {
                    return (
                        <Label className="capitalize" key={item}>
                            {item}
                        </Label>
                    );
                })
            }
        </div>
        <DialogFooter>
          <Button className="bg-red-500" type="submit" onClick={() => {setOpen(false); setConfirm(true);}}>Save changes</Button>
          <Button type="submit" onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
