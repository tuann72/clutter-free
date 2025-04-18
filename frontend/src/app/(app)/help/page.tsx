import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
  

export default function Help(){
    return(
        <div className="grid grid-rows-[1fr_50px] w-full overflow-hidden">
                {/* Help accordion with FAQs and answers upon pulldown */}
                <Accordion className="w-screen max-w-[500px] md:max-w-[700px] place-self-center" type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How can I change task views?</AccordionTrigger>
                            <AccordionContent>
                                <p>In the navigation bar on the side, there is a Task Views option.</p>
                                <p>Click there and you will see a panel on the left under the Filter section</p>
                                <p>where you can select the task view of your choice!</p>
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I add a new task?</AccordionTrigger>
                            <AccordionContent>
                                <p>In the navigation bar on the side, there is a New Task option. </p>
                                <p>Click there and you will see an input box where you can</p>
                                <p>type a comma-separated list of your tasks and submit!</p>
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Where can I find accessibility features?</AccordionTrigger>
                            <AccordionContent>
                                <p>In the navigation bar on the side, there is a Preferences option.</p>
                                <p>Click there and select the preferences accustomed to your liking!</p>
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>How can I change to light/dark mode?</AccordionTrigger>
                            <AccordionContent>
                                <p>In the top right corner, there is a light/dark mode button.</p>
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>There is too much clutter! How can I reduce the number of components?</AccordionTrigger>
                            <AccordionContent>
                                <p>There are three ways to reduce clutter.</p> <br/>
                                <p>1. In the top right corner you use the eye icon to collapse the top right option.</p>
                                <p>2. In the top left corner, use the double arrow button to collapse the sidebar.</p>
                                <p>3. The taskview section can be resized by select grabbing the small gray panels.</p>
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>How can I delete multiple items in taskview?</AccordionTrigger>
                            <AccordionContent>
                                <p>On taskview, select the check box button on the left of the tasks you want to delete.
                                    Then select 'Delete Selected Items' and confirm.
                                </p>
                            </AccordionContent>
                    </AccordionItem>
                </Accordion>
        </div>
    )
}