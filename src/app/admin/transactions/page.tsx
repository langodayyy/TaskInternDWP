"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import MainLayout from "../../layouts/mainLayout";
// import { console } from "inspector";
interface transaksi {
  id: number;
  phone: string;
  userId: number;
  date: string;
  package: {
    id: number;
    name: string;
    price: number;
    quota: string;
    validity: string;
    description: string;
    provider: string;
  };
  user: {
    id: number;
    username: string;
  };
}

export default function RiwayatTransaksi() {
  const [data, setData] = useState<transaksi[]>([]);
  const totalHarga = data.reduce((sum, trx) => {
    return sum + (trx.package?.price || 0);
  }, 0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    Promise.all([
      fetch(`http://localhost:3001/transactions`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:3001/packages`).then((res) => res.json()),
      fetch(`http://localhost:3001/users`).then((res)=> res.json()),
    ])
      .then(([transactions, packages, users]) => {
        const merged = transactions.map((trx: { packageId: number, userId: number }) => ({
          ...trx,
          package: packages.find(
            (pkg: { id: any }) => pkg.id === trx.packageId
          ),
            user: users.find(
                (user: { id: any }) => user.id === trx.userId
            ),
        }));
        console.log("Data transaksi:", merged);
        setData(merged);
      })
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);


  return (
    <MainLayout>
      <section className="p-6 space-y-8 h-screen">
        <div className="w-full bg-white h-fit p-6 rounded-2xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>
              <p className="text-sm text-gray-500">
                Berikut adalah riwayat transaksi Customer.
              </p>
            </div>
            <div className="">
              <Table className="w-full rounded-2xl">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="">No.</TableHead>
                    <TableHead className="">Tanggal</TableHead>
                    <TableHead className="">Username</TableHead>
                    <TableHead>Jenis Paket</TableHead>
                    <TableHead>No. Hp</TableHead>
                    <TableHead className="">Harga</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((Trx, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        {new Date(Trx.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {Trx.user?.username || "Tidak tersedia"}
                      </TableCell>
                      <TableCell>
                        {Trx.package?.name || "Tidak tersedia"}
                      </TableCell>
                      <TableCell>{Trx.phone}</TableCell>
                      <TableCell className="">
                        {Trx.package?.price || "Tidak tersedia"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="text-left font-bold">
                        Total Pendapatan:
                        </TableCell>
                        <TableCell colSpan={3} className="font-bold text-right">{totalHarga}</TableCell>
                    </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
