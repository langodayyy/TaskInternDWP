"use client";

import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus data login dari localStorage (atau session)
    localStorage.removeItem("user");

    // Redirect ke halaman login
    router.push("/auth/login");
  };

  return (
    <header className="w-full z-10 top-0 flex-row items-center flex justify-between bg-white py-[16px] shadow-[0px_2px_4px_#B0B0B0] fixed">
      <div className="flex justify-between w-full px-[32px]">
        <a href="#" className="text-2xl font-medium">
          mY konter
        </a>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </header>
  );
}
