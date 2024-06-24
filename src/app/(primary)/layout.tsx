"use client";
import React from "react";
// components
import Footer from "../components/Footer";
// styles
import { MainApp } from "../styles/App.styles";
// utils
import { screens } from "@/utils/data";

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    default: {
      assets: { bgImg },
    },
  } = screens;
  return (
    <MainApp $bgImg={bgImg.src}>
      {children}
      <Footer />
    </MainApp>
  );
}
