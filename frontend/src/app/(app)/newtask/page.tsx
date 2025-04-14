'use client'
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/context/UserContext';

export default function NewTask() {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userInfo = useUserInfo();

  const router = useRouter();
  
  // Handle textarea input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setError(null);
  };

  // Handle submission of new task(s)
  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setError('Please enter at least one task');
      return;
    }

    if (!userInfo?.email) {
      throw new Error("Could not find user email");
    }
    // Gets user's email and creates API endpoint
    const userEmail = userInfo?.email;
    const endpoint = `http://localhost:8000/users/${encodeURIComponent(userEmail)}/tasks`;

    try {
      // Send tasks to backend for data persistence and NLP
      setIsLoading(true);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tasks: inputText.split('\n').filter(task => task.trim()), // Convert text to task array
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get backend response in JSON
      const result = await response.json();
      //console.log('Success:', result);
      // redirect to task view page
      router.push('/taskview');

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white-100">
      <div className="w-full max-w-2xl bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-md font-medium mb-4 text-gray-700">
          Enter your tasks here
        </h2>
        <Textarea
          placeholder="E.g. Clean Bathroom, Workout, etc."
          className="w-full h-24 text-lg p-3 border border-gray-300 rounded-md"
          value={inputText}
          onChange={handleInputChange}
        />
        <p className="text-gray-500 text-sm mb-4 text-left">
          Your tasks will be organized.
        </p>
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-6 text-md rounded-md transition"
          >
            {isLoading ? 'Saving...' : 'Generate Task Views'}
          </Button>
        </div>
      </div>
    </div>
  );
}