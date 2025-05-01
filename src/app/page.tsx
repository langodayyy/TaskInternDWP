// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/login');
  return null; // penting agar tidak render apa-apa setelah redirect
}
