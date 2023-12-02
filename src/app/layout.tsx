import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// components
import { Layout } from "@/components/Layout";

// context or store

// constants and functions
import { META_TITLE, META_DESCRIPTION } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

/**

Metadata object containing information about the website.
@property {string} title - The title of the website.
@property {string} description - The description of the website.
@property {object} icons - An object containing information about the icons of the website.
@property {string} icons.icon - The path to the favicon icon.
@typedef {object} Metadata
@memberof module:common */
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
