"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { setupAxiosInterceptors } from "@/helpers/interceptor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first");
      router.push("/");
      return;
    }
    setToken(token);
  }, [router]);

  useEffect(() => {
    if (token) {
      // Set up the Axios interceptor
      setupAxiosInterceptors(token, () => {
        alert("Your session has expired. Please log in again.");
        localStorage.clear();
        router.push("/"); // Redirect to login page on token expiration
      });
    }
  }, [router, token]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen w-screen">
          <Header />
          <div className="max-w-full max-h-full overflow-auto">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
