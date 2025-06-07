"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Success() {
  const router = useRouter();
  const successSound = useRef(null);

  useEffect(() => {
    successSound.current?.play();
  }, []);

  return (
    <main
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('/SuccessBG.png')`,
      }}
    >
      {/* 成功音效 */}
      <audio ref={successSound} src="/success.mp3" preload="auto" />

      {/* 老師圖片 */}
      <img
        src="/VaryHappyTeacher.png"
        alt="非常開心老師"
        className="absolute left-100 bottom-[-20px] h-[500px] w-auto animate-shake"
      />

      {/* 學生圖片 */}
      <img
        src="/HappyStudent.png"
        alt="開心學生"
        className="absolute bottom-[-500px] right-10 w-[730px] h-auto animate-enlarge"
      />

      {/* 成功文字 */}
      <div className="absolute left-[150px] bottom-[550px] text-gray-900 text-2xl font-bold text-left tracking-wider leading-9 w-120 flex flex-col items-center z-10">
        上一世，我只是考卷上的一個錯誤選項，<br />
        沒有名字，也沒有結局。<br />
        這一次，我每答對一題，現實就向我低頭。<br />
        命運的試卷，現在由我出題。
      </div>

      {/* 按鈕區塊 */}
      <div className="absolute bottom-50 left-40 z-10 flex flex-col items-end gap-12">
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
