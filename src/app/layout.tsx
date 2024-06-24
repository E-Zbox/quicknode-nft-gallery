import type { Metadata } from "next";
import React from "react";
// components
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "Quicknode NFT Gallery",
  description:
    "A quicknode powered Dapp that allows users explore details of any of their favorite NFT collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
