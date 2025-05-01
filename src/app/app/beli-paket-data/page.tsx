"use client";
import React, { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    provider: string; // tambahkan ini
  }

  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/packages")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setOpenIds(data.map((pkg: Package) => pkg.id)); // buka semua
      })
      .catch((err) => console.error("Gagal fetch:", err));
  }, []);

  // Kelompokkan paket berdasarkan provider
  const grouped = packages.reduce<Record<string, Package[]>>((acc, pkg) => {
    if (!acc[pkg.provider]) acc[pkg.provider] = [];
    acc[pkg.provider].push(pkg);
    return acc;
  }, {});

  const [openIds, setOpenIds] = useState<number[]>([]);


  return (
    <div className="p-6 space-y-8">
      {Object.entries(grouped).map(([provider, pkgs]) => (
        <div key={provider}>
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
                      }}>
                        {openIds.includes(pkg.id)  ? (
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                    <Button>Beli</Button>
                    
                  </div>
                </Collapsible>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
