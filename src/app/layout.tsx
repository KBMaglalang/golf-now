import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// components
import { Layout } from "@/components/Layout";

// context or store

// constants and functions
import { META_TITLE, META_DESCRIPTION } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  icons: {
    icon: "./favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
