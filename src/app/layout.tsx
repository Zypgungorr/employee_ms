import { ClerkProvider, SignedIn, SignOutButton } from "@clerk/nextjs";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen">
          <div id="app" style={{ height: "100vh" }}>
            <SignedIn>
              <div className="flex justify-end bg-zinc-700">
                <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded m-4 mr-10">
                  <SignOutButton />
                </div>
              </div>
            </SignedIn>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
