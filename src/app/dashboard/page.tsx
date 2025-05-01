"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/app/layouts/mainLayout";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import router from "next/router";


export default function DashboardPage() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);
  return (
    <MainLayout>
      <section className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-[100px]">Selamat datang di dashboard Anda!</p>
        <Button>tess</Button>
      </section>
    </MainLayout>
    
  );
}
