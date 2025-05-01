import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PassswordInput  from "@/components/ui/passwordInput";
// import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-4">
        <Input placeholder="Username"></Input>
        <PassswordInput ></PassswordInput>
       <Button>Login</Button>
      </form>
    </div>
  );
}
