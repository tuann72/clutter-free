import { SignIn, useUser } from '@clerk/nextjs'

export default function Login() {
  return (
    <div className="grid grid-cols-[1.5fr_1fr] h-screen">
      <div className="flex justify-center items-center bg-slate-200">
        <div className='flex-col'>
          <p className='text-5xl'>
          ClutterFree
          </p>
          <span>
            LOGIN CURRENTLY NOT WORKING
          </span>
        </div>
      </div>
      <div className="place-self-center">
        <SignIn />
      </div>
    </div>
  );
}
