"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthLayout from "../../layouts/authLayout";
import PasswordInput from "@/components/ui/passwordInput";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/users?username=${username}&password=${password}`);
      const data = await res.json();
      console.log(data);
      
      const found = data.find(
        (u: any) => u.username === username && u.password === password
      );
      console.log("Found user:", found);
      
        
      if (found && found.role === "admin") {
        localStorage.setItem("user", JSON.stringify(found));
        router.push("/admin/customers");
      } 
      else if (found && found.role === "customer") {
        console.log('tes')
        localStorage.setItem("userId", found.id);
        router.push("/transaksi");
      }
      else {
        setError("Username atau password salah.");
      }
      // console.log("Router is", router);
    } catch (err) {
      console.error(err);
      setError("Gagal menghubungi server.");
    }
  };

  
  return (
    <AuthLayout>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            value={password ?? ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit">Login</Button>
          
        </form>
      </div>
    </AuthLayout>
  );
}
function setMounted(arg0: boolean) {
  throw new Error("Function not implemented.");
}

