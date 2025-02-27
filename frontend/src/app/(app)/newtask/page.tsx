import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewTask() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white-100">
      <div className="w-full max-w-2xl bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-md font-medium mb-4 text-gray-700">
          Enter your tasks here
        </h2>
        <Textarea
          placeholder="E.g. Clean Bathroom, Workout, etc."
          className="w-full h-24 text-lg p-3 border border-gray-300 rounded-md"
        />
        <p className="text-gray-500 text-sm mb-4 text-left">
          Your tasks will be organized.
        </p>
        <div className="flex justify-end">
          <Button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-6 text-md rounded-md transition"
          >
            Generate Task Views
          </Button>
        </div>
      </div>
    </div>
  );
}
