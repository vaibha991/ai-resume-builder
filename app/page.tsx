
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import "./globals.css";
export default async function HomePage() {
  const { userId } = await auth();

  if (!userId) {
    // Not logged in → send to sign-in
    redirect("/sign-in");
  } else {
    // Logged in → send to dashboard
    redirect("/dashboard");
  }
}

