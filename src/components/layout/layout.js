"use client";
import React from "react";
import Menu from "../menu/menu";
import Header from "../header/header";

export default function Layout({ children }) {
  return (
    <main className="flex flex-row justify-start items-start h-full min-h-auto bg-[#130F2F] pb-[5rem]">
      <Menu />
      <div className="w-full md:ml-[10rem] ml-0">
        <Header />
        <div className="max-w-[1440px] m-auto mt-20 sm:px-20 px-5">
          {children}
        </div>
      </div>
    </main>
  );
}
