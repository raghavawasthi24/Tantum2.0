import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId="1060861804241-k6fa19ikvfqs4gqjj86u7flvhhj2huq0.apps.googleusercontent.com">
        <body className={inter.className}>{children}</body>
      </GoogleOAuthProvider>
    </html>
  );
}
