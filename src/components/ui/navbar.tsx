"use client";

import { Button } from "./button";


export default function Navbar() {
  
  return (
    <header className="w-full z-10 top-0 flex-row items-center flex justify-between bg-white py-[16px]  shadow-[0px_2px_4px_#B0B0B0] fixed">
      <div className="flex justify-between  w-full px-[32px]">
        <a href="#" className="text-2xl font-medium focus:outline-nonext-left">
          mY konter
        </a>
        <Button>Log Out</Button>
      </div>
    </header>
  );
}
