import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import CustomerReviewSection from "@/components/CustomerReviewSection";
import Navbar from "@/components/Navbar"; 
import Providers from "./providers"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADNOVIQ Store",
  description: "Premium E-commerce Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          
          <Navbar />
          <main>{children}</main>
          <CustomerReviewSection />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
