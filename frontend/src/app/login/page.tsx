import React from 'react'
import { SignIn, useUser } from '@clerk/nextjs'

export default function Login() {
  return (
    <div className="grid grid-cols-[1.5fr_1fr] h-screen">
      <div className="bg-blue-300">
        Column 1
      </div>
      <div className="place-self-center">
        <SignIn />
      </div>
    </div>
  )
}
