import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="p-56 flex justify-center items-center min-w-full bg-zinc-800">
      <SignUp forceRedirectUrl={"add-record"} signInUrl = './login'  />
    </div>
  );
}