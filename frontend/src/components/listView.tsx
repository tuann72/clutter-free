"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TaskDialog } from "./taskDialog"
import { ConfirmDelete } from "./confirmDelete"

// const data: Task[] = [
//   {
//     category: "Work",
//     estimate: 100,
//     intensity: 2,
//     status: "in progress",
//     task: "Create AI Model",
//   },
//   {
//     category: "Health",
//     estimate: 60,
//     intensity: 3,
//     status: "in progress",
//     task: "Go to Hike",
//   },
//   {
//     category: "Growth",
//     estimate: 5,
//     intensity: 1,
//     status: "not started",
//     task: "Meditate",
//   },
// ]


// Create task json attributes
export type Task = {
  id: number
  category: "Work" | "Health" | "Home" | "Growth" | "Social"
  estimate: number
  intensity: number
  status: "not-started" | "in-progress" | "completed"
  task: string
}

// turn it into interface for function to use
interface ListViewProps {
  data: Task[];
}

// create list view
export function ListView({ data }: ListViewProps) {
  // table functionality
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // edit task dialog appeareance tracking
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmDeleteOpen, setConfDeleteOpen] = useState(false)
  const [hasConfirmed, setHasConfirmed] = useState(false)

  // stores a specific task's variables
  const [currTaskName, setCurrTaskName] = useState("");
  const [currEstimate, setCurrEstimate] = useState(0);
  const [currIntensity, setCurrIntensity] = useState(0);
  const [currCategory, setCurrCategory] = useState("");
  const [currStatus, setCurrStatus] = useState("");
  const [currID, setCurrID] = useState(-1);

  // function to handle when user selects edit task
  const handleTaskEdit = async (task_id: number, name_param : string, esti_param: number, inten_parem: number, catego: string, stat: string) => {
    // updates varaibles accordingly
    setCurrID(task_id)
    setCurrTaskName(name_param)
    setCurrEstimate(esti_param)
    setCurrIntensity(inten_parem)
    setCurrCategory(catego)
    setCurrStatus(stat)

    // sets open to true to open dialog box
    setDialogOpen(true)
  }

  // deletes single task based on id
  const deleteTask = (task_id : number) => {
    console.log("Attempting to delete task id: " + task_id)

    // fetch request to delete task
    fetch("http://localhost:8000/tasks/" + task_id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Task deleted successfully")
          // refresh the page to see changes
          window.location.reload()
        } else {
          console.error("Failed to delete task")
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error)
      })
  }

  // create columns for task
  const columns: ColumnDef<Task>[] = [
    // create select option
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // reate status column
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "task",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Task
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("task")}</div>,
    },
    // create estimate column
    {
      accessorKey: "estimate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Estimate
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const estimate = parseFloat(row.getValue("estimate"))
        // create interface for time
        interface FormatEstimate {
          (minutes: number): string;
        }
  
        // creates function to convert time
        const formatEstimate: FormatEstimate = (minutes) => {
          if (minutes >= 60) {
            const hours = (minutes / 60).toFixed(1); // Show 1 decimal place
            return `${hours} hour${parseFloat(hours) > 1 ? "s" : ""}`;
          }
          return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
        };
  
        return <div className="text text-center">{formatEstimate(estimate)}</div>;
      },
    },
    // creates intensity column
    {
      accessorKey: "intensity",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Intensity
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const intensity = parseFloat(row.getValue("intensity"))
        return <div className="text-center">{intensity}</div>
      },
    },
    // create category column
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center capitalize">{row.getValue("category")}</div>,
    },
    // create options column
    {
      id: "options",
      enableHiding: false,
      cell: ({ row }) => {
        const Task = row.original
        // options column has a dropdown menu to edit or delete task
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleTaskEdit(Task.id, Task.task, Task.estimate, Task.intensity, Task.category, Task.status)}>Edit Task</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteTask(Task.id)}>Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
// create table with base functionally, documentation can be found in shadcn table component
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

// deletes multiple selected tasks
// we use a useffect to check when hasConfirmed updates
useEffect(() => {
  // we process tasks when hasConfirmed is true
  // this conditional also prevents useEffect from looping itself
  if(hasConfirmed == true){
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const rowDetails = selectedRows.map((row) => row.original);

    const selectedID = rowDetails.map((task) => task.id);
    console.log(selectedID);

    // fetch request to delete each task
    const deletePromises = selectedID.map((task_id) =>
      fetch("http://localhost:8000/tasks/" + task_id, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Task deleted successfully");
          } else {
            console.error("Failed to delete task");
          }
        })
        .catch((error) => {
          console.error("Error deleting task for " + task_id + ", " + error);
        })
    );
    // wait for all deletions before reloading
    Promise.all(deletePromises).then(() => {
      window.location.reload();
    });
  }
  
  // resets hasConfirmed after deletion
  setHasConfirmed(false)
  
},[hasConfirmed, table]);

// acquires all the selected task as strings to pass to dialog box for display
const getTask = () => {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const rowDetails = selectedRows.map((row) => row.original);
  const selectedNames = rowDetails.map((task) => task.task);

  return selectedNames
}

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* Input field for search bar */}
        <Input
          placeholder="Search Task"
          value={(table.getColumn("task")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("task")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* dropdown menu for columns */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* applies filters to hide columns */}
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          {/* table header names */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* row content */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                // check for selected
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          {/* Changes items that are selected to complete status*/} 
          <Button
            variant="outline"
            size="sm"
            disabled={table.getFilteredSelectedRowModel().rows.length == 0}
          >
            Complete Seleted
          </Button>
          {/* deletes items that are selected */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfDeleteOpen(true)}
            disabled={table.getFilteredSelectedRowModel().rows.length == 0}
          >
            Delete Selected
          </Button>
            {/* previous page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          {/* next page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* creates dialog boxes */}
      <ConfirmDelete setOpen={setConfDeleteOpen} setConfirm={setHasConfirmed} showDialog={confirmDeleteOpen} tasks={getTask()}/>
      <TaskDialog t_id={currID} showDialog={dialogOpen} setOpen={setDialogOpen} t_name={currTaskName} est={currEstimate} intense={currIntensity} categ={currCategory} stat={currStatus}/>

    </div>
  )
}
