"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// possible options for task views
const options = [
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

export function TaskViewComboBox({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  // stores open and close status of combobox
  const [open, setOpen] = React.useState(false)

  return (
    // open if the status is true
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* intitial button to open combobox */}
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between"
        >
          {/* default value */}
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select Style"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {/* for each item in option we create a selectable label */}
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setOpen(false)
                    onValueChange(currentValue === value ? "" : currentValue)
                  }}
                >
                  {option.label}
                  {/* if option is checked changed its appearance */}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
