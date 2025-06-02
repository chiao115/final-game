"use client";
import { useRouter } from "next/navigation";

export default function Fail() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-red-100 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-red-700">你失敗了！老師失去耐心了！</h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          再玩一次
        </button>
        <button className="bg-white text-red-700 px-4 py-2 rounded border border-red-700 hover:bg-red-100">
          回首頁
        </button>
      </div>
    </main>
  );
}
