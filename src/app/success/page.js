"use client";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-green-100 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-green-700">你成功了！老師超級感動！</h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          再玩一次
        </button>
        <button className="bg-white text-green-700 px-4 py-2 rounded border border-green-700 hover:bg-green-100">
          回首頁
        </button>
      </div>
    </main>
  );
}