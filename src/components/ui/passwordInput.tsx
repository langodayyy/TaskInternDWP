"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ value, onChange }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        placeholder="Masukkan password"
        className="pr-10"
        value={value}
        onChange={onChange}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
      >
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </Button>
    </div>
  );
}
