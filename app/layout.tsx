import type { Metadata } from "next";
import { Roboto} from 'next/font/google';
import "./globals.css";
import { request } from "http";
import ClientProvider from "@/hoc/ClientProvider";
import { Toaster } from "sonner";

const font = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ["latin"],
})
export const metadata: Metadata = {
  title: "OTP-Manager",
  description: "MERN AUTH CAPSTONE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`} >
        <ClientProvider> {children} 
          <Toaster/>
       </ClientProvider>
      </body>
    </html>
  );
}
