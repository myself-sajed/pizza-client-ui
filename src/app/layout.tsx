import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/custom/navbar";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", });

export const metadata: Metadata = {
  title: "Welcome | Round Pizza",
  description: "Your most amazing pizza corner.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-manrope antialiased",
        manrope.variable
      )}
      >
        <div>
          <Navbar />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
