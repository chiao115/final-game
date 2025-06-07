"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Fail() {
  const router = useRouter();
  const failSound = useRef(null);

  useEffect(() => {
    failSound.current?.play();
  }, []);

  return (
    <main
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('/FailBG.png')`,
      }}
    >
      {/* 失敗音效 */}
      <audio ref={failSound} src="/fail.mp3" preload="auto" />

      {/* 老師圖片 */}
      <img
        src="/VaryAngryTeacher.png"
        alt="生氣老師"
        className="absolute left-20 bottom-[-20px] h-screen w-auto animate-enlarge"
      />

      {/* 學生圖片 */}
      <img
        src="/CryStudent.png"
        alt="哭哭學生"
        className="absolute bottom-0 right-20 w-[850px] h-auto animate-shake"
      />

      {/* 文字 */}
      <div className="absolute right-[300px] bottom-[620px] text-gray-900 text-2xl font-bold text-right tracking-wider leading-9 w-110 flex flex-col items-center z-10">
        我以為這次能證明極限存在<br />
        結果再次被無限打臉<br />
        看來⋯這終究只是一場夢
      </div>

      {/* 按鈕 */}
      <div className="absolute top-25 right-50 z-10 flex flex-col items-end gap-2">
        <button onClick={() => router.push("/")}>
          <img
            src="/PlayAgainButton.png"
            alt="再玩一次"
            className="w-[140px] hover:scale-105 transition-transform duration-150"
          />
        </button>

        <button onClick={() => router.push("/")}>
          <img
            src="/HomeButton.png"
            alt="回首頁"
            className="w-[140px] hover:scale-105 transition-transform duration-150"
          />
        </button>
      </div>
    </main>
  );
}
