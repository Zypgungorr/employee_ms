import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (

    <div className="p-64 flex justify-center items-center min-w-full bg-zinc-800">
      <SignIn forceRedirectUrl={"add-record"} signUpUrl = './sign-up'  />
    </div>
  
  );
}