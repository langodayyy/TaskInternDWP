"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/mainLayout";
import PhoneInput from "@/components/ui/inputPhone";
import { Button } from "@/components/ui/button";
import {
  Sheet,

  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


export default function KatalogPaket() {
  interface Package {
    id: number;
    name: string;
    quota: string;
    validity: string;
    description: string;
    price: number;
    provider: string; 
  }

  const [form, setForm] = useState({
    phone: "",
  });

  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/packages")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setOpenIds(data.map((pkg: Package) => pkg.id)); 
      })
      .catch((err) => console.error("Gagal fetch:", err));
  }, []);

  

  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);

  const handleSubmit = async () => {
    const storedUserId = localStorage.getItem("userId");
    if (!form.phone || !selectedPackageId || !storedUserId) {
      alert("Pastikan nomor HP, userId, dan paket telah dipilih.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(storedUserId),
          packageId: Number(selectedPackageId),
          phone: form.phone,
          date: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        alert("Transaksi berhasil!");
        setForm({ phone: "" });
      } else {
        alert("Gagal menyimpan transaksi");
      }
    } catch (error) {
      console.error("Gagal transaksi:", error);
      alert("Terjadi kesalahan saat transaksi.");
    }
  };
  
  

  const grouped = packages.reduce<Record<string, Package[]>>((acc, pkg) => {
    if (!acc[pkg.provider]) acc[pkg.provider] = [];
    acc[pkg.provider].push(pkg);
    return acc;
  }, {});

  const [openIds, setOpenIds] = useState<number[]>([]);

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        {Object.entries(grouped).map(([provider, pkgs]) => (
          <div key={provider} className="p-6 space-y-8 bg-white rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3 text-neutral-900">
              {provider}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {pkgs.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded ">
                  <Collapsible
                    open={openIds.includes(pkg.id)}
                    className="w-full border rounded p-4 shadow-sm bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-semibold">{pkg.name}</h3>
                      </div>
                      <CollapsibleTrigger asChild>
                        <button
                          onClick={() => {
                            setOpenIds((prev) =>
                              prev.includes(pkg.id)
                                ? prev.filter((id) => id !== pkg.id)
                                : [...prev, pkg.id]
                            );
                          }}
                        >
                          {openIds.includes(pkg.id) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-up"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M6 15l6 -6l6 6" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M6 9l6 6l6 -6" />
                            </svg>
                          )}
                        </button>
                      </CollapsibleTrigger>
                    </div>

                    {openIds.includes(pkg.id) && (
                      <CollapsibleContent className="mt-2 space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          🌐 {pkg.quota}
                        </div>
                        <div className="flex items-center gap-2">
                          📅 {pkg.validity}
                        </div>
                        <div className="flex items-center gap-2">
                          ℹ️ {pkg.description}
                        </div>
                      </CollapsibleContent>
                    )}

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-neutral-900 font-bold text-lg">
                        Rp. {pkg.price.toLocaleString()}
                      </span>
                      <Sheet>
                        <SheetTrigger asChild>
                        <Button onClick={() => setSelectedPackageId(pkg.id)}>Beli</Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Beli paket data</SheetTitle>
                          </SheetHeader>
                          <div className=" gap-4 flex flex-col px-4">
                            <div className="text-neutral-900 text-xl font-semibold">
                              {pkg.provider}
                            </div>
                            <div className="px-4 gap-4 flex flex-col">
                              <div className="flex items-center gap-2">
                                🌐 {pkg.quota}
                              </div>
                              <div className="flex items-center gap-2">
                                📅 {pkg.validity}
                              </div>
                              <div className="flex items-center gap-2">
                                ℹ️ {pkg.description}
                              </div>
                            </div>

                            <PhoneInput
                              value={form.phone}
                              onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                              }
                            ></PhoneInput>
                            <Button onClick={handleSubmit}>Konfirmasi Beli</Button>
                          </div>
                          <SheetFooter></SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </Collapsible>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
