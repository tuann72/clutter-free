import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  // Redirect user to sign-in page if not signed in, redirect to newtask page otherwise
  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }
  else {
    redirect("/newtask");
  }
  return null;
}
