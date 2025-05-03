"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import MainLayout from "../../layouts/mainLayout";
// import { console } from "inspector";
interface customer {
  id: number;
  username: string;
  name: string;
}

export default function Customers() {
  const [data, setData] = useState<customer[]>([]);
 

    useEffect(() => {
      fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
    }, []);

  
  return (
    <MainLayout>
      <section className="p-6 space-y-8 h-screen">
        <div className="w-full bg-white h-fit p-6 rounded-2xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>
              <p className="text-sm text-gray-500">
                Berikut adalah pelanggan my Konter.
              </p>
            </div>
            <div className="">
              <Table className="rounded-2xl justify-between">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="">No.</TableHead>
                    <TableHead className="">Username</TableHead>
                    <TableHead>Nama</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((Trx, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        {Trx.username || "Tidak tersedia"}
                      </TableCell>
                      <TableCell>
                        {Trx.name}
                      </TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
               
              </Table>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
