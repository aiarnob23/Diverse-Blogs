"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <button onClick={()=>signOut()}>Logout</button>
    </div>
  );
}
