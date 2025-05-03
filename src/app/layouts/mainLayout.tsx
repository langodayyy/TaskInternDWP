
import React from "react";
import Sidebar from "../../components/ui/sidebar";
import Navbar from "../../components/ui/navbar";
import { useEffect, useState } from "react";

import { ReactNode } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) 
{
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    const user = data ? JSON.parse(data) : null;
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);
  return (
    <>
    
      <Sidebar />
      <Navbar />
      <div className=" ">
        <main className="ml-[250px] bg-neutral-100">{children}</main>
      </div>
    </>
  );
}
