'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"

export default function Test(){
    const { user } = useUser();
    return(
        <div className="grid grid-rows-[1fr_50px] w-full overflow-hidden">
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
                </Accordion>
                <UserButton />
                <div>
                {user ? (
                    <h1>Welcome, {user.firstName}!</h1>
                ) : (
                    <h1></h1>
                )}
                </div>
        </div>
    )
}