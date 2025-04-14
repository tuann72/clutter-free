import { SignIn, useUser } from '@clerk/nextjs'

export default function Login() {
  return (
    <div className="grid grid-cols-[1.5fr_1fr] h-screen">
      <div className="flex justify-center items-center bg-slate-200">
        <div className='flex-col'>
          <p className='text-5xl'>
          ClutterFree
          </p>
          A distraction free productivity tool.
        </div>
      </div>
      <div className="place-self-center">
        {/* Sign in component from Clerk for users to sign in */}
        <SignIn />
      </div>
    </div>
  );
}