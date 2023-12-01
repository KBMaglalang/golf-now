import React from "react";

// components
import { Header } from "../Header";
import { Footer } from "../Footer";
import { SessionProvider } from "@/providers/SessionProvider";

// context or store
import { StateProvider } from "@/context/stateContext";

// constants and functions

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <SessionProvider>
        <StateProvider>
          <Header />
          {children}
          <Footer />
        </StateProvider>
      </SessionProvider>
    </>
  );
}
