import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/custom/Nav";
import { ReactQueryClientProvider } from "@/components/custom/ReactQueryClientProvider";

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
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={cn(
          "min-h-screen bg-background font-manrope antialiased",
          manrope.variable
        )}
        >
          <div>
            <Nav />
            <main>
              {children}
            </main>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
