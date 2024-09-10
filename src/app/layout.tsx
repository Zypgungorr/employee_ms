"use client"
import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const tokenExpireTime = localStorage.getItem("tokenExpireTime");

    if (tokenExpireTime && Date.now() > parseInt(tokenExpireTime)) {
     
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpireTime");
      router.push("/login"); 
    }
  }, [router]);

  return (
    <html lang="en">
      <body className="min-h-screen">
        <div id="app" style={{ height: "100vh" }}>
          {children}
        </div>
      </body>
    </html>
  );
}

