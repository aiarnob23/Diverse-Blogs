"use client";

import { signIn } from "next-auth/react";

   
export default function Login() {
  return (
      <div> 
          <button onClick={() => signIn("google", {
             callbackUrl:"http://localhost:3000",
         })}>Login with google</button><br/>
          <button onClick={() => signIn("github", {
             callbackUrl:"http://localhost:3000",
         })}>Login with Github</button>
      </div>
  );
}