import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/custom/Nav";
import { ReactQueryClientProvider } from "@/components/custom/ReactQueryClientProvider";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/custom/Footer";
import TokenRefresher from "./TokenRefresher";

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
      <StoreProvider>
        <html lang="en">
          <body className={cn(
            "bg-background font-manrope antialiased",
            manrope.variable
          )}
          >
            <div className="min-h-screen">
              <Nav />
              <main>
                <TokenRefresher>
                  {children}
                  <Toaster position="top-right" toastOptions={{ actionButtonStyle: { backgroundColor: "#F97316" }, duration: 2300 }} richColors />
                </TokenRefresher>
              </main>
            </div>
            <Footer />
          </body>
        </html>
      </StoreProvider>
    </ReactQueryClientProvider>
  );
}
