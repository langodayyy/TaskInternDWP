import React from "react";
import Sidebar from "../../components/ui/sidebar";
import Navbar from "../../components/ui/navbar";

import { ReactNode } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className=" ">
        <main className="ml-[250px] mt-[68px] bg-neutral-100">{children}</main>
      </div>
    </>
  );
}
