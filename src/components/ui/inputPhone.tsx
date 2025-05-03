import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export default function PhoneInput({ value, onChange }: PhoneInputProps)  {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor="phone">No Hp</Label>
      <div className="flex border border-neutral-300 rounded-md overflow-hidden ">
        <div className="flex items-center justify-center px-2 py-2 text-neutral-700 bg-white border-r border-neutral-300">
          +62
        </div>
        <Input
          id="phone"
          type="number"
          name="phone"
          placeholder="Masukkan no hp kamu"
          value={value}
          onChange={onChange}
          className="flex h-full justify-center items-center border-0 focus-visible:ring-0 focus-visible:border-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          inputMode="numeric"
        />
      </div>
    </div>
  );
}
