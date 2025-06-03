"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { 題目: "89 - 12 = ?", 選項: [82, 78, 68, 77], 正確答案: 77, 難度: "簡單" },
  { 題目: "96 + 69 = ?", 選項: [173, 156, 165, 157], 正確答案: 165, 難度: "簡單" },
  { 題目: "86 - 85 = ?", 選項: [1, 7, -5, 8], 正確答案: 1, 難度: "簡單" },
  { 題目: "26 + 35 = ?", 選項: [68, 59, 61, 66], 正確答案: 61, 難度: "簡單" },
  { 題目: "75 - 66 = ?", 選項: [4, 15, 9, 17], 正確答案: 9, 難度: "簡單" },
  { 題目: "38 + 46 = ?", 選項: [78, 82, 88, 84], 正確答案: 84, 難度: "簡單" },
  { 題目: "49 - 30 = ?", 選項: [19, 28, 26, 9], 正確答案: 19, 難度: "簡單" },
  { 題目: "66 + 66 = ?", 選項: [128, 133, 132, 127], 正確答案: 132, 難度: "簡單" },
  { 題目: "81 + 55 = ?", 選項: [136, 133, 144, 140], 正確答案: 136, 難度: "簡單" },
  { 題目: "69 - 28 = ?", 選項: [42, 33, 36, 41], 正確答案: 41, 難度: "簡單" },
  { 題目: "87 + 77 = ?", 選項: [164, 165, 162, 154], 正確答案: 164, 難度: "簡單" },
  { 題目: "62 - 34 = ?", 選項: [36, 28, 21, 27], 正確答案: 28, 難度: "簡單" },
  { 題目: "22 + 54 = ?", 選項: [70, 76, 67, 71], 正確答案: 76, 難度: "簡單" },
  { 題目: "46 + 35 = ?", 選項: [80, 81, 78, 76], 正確答案: 81, 難度: "簡單" },
  { 題目: "82 + 14 = ?", 選項: [96, 92, 88, 100], 正確答案: 96, 難度: "簡單" },
  { 題目: "(24 - 39) * 16 = ?", 選項: [-240, -272, -200, -265], 正確答案: -240, 難度: "中等" },
  { 題目: "(27 - 10) * 7 = ?", 選項: [119, 98, 121, 91], 正確答案: 119, 難度: "中等" },
  { 題目: "(33 - 18) - 12 = ?", 選項: [3, 1, 7, -2], 正確答案: 3, 難度: "中等" },
  { 題目: "(45 / 25) + 11 = ?", 選項: [12.8, 13.2, 13.1, 14.6], 正確答案: 12.8, 難度: "中等" },
  { 題目: "(25 - 12) * 5 = ?", 選項: [55, 60, 65, 50], 正確答案: 65, 難度: "中等" },
  { 題目: "(2 - 43) * 4 = ?", 選項: [-164, -160, -180, -172], 正確答案: -164, 難度: "中等" },
  { 題目: "(210 * 42) * 16 = ?", 選項: [80, 73, 95, 124], 正確答案: 80, 難度: "中等" },
  { 題目: "(29 + 4) * 20 = ?", 選項: [660, 600, 640, 700], 正確答案: 660, 難度: "中等" },
  { 題目: "(112 * 7) / 4 = ?", 選項: [3, 4, 5, 3.4], 正確答案: 4, 難度: "中等" },
  { 題目: "(45 * 22) - 3 = ?", 選項: [987, 1207, 867, 997], 正確答案: 987, 難度: "中等" },
  { 題目: "(42 + 33) / 3 = ?", 選項: [25, 24, 27, 30], 正確答案: 25, 難度: "中等" },
  { 題目: "(25 * 55) / 5 = ?", 選項: [275, 305, 425, 235], 正確答案: 275, 難度: "中等" },
  { 題目: "(27 / 18) / 10 = ?", 選項: [0.15, 0.18, 0.12, 0.2], 正確答案: 0.15, 難度: "中等" },
  { 題目: "(49 - 18) + 13 = ?", 選項: [44, 45, 43, 42], 正確答案: 44, 難度: "中等" },
  { 題目: "(44 * 18) + 17 = ?", 選項: [809, 800, 795, 820], 正確答案: 809, 難度: "中等" },
  { 題目: "y = -2/7(x-10)^2+9 的函數值不可能為下列何者？", 選項: ["10", "9", "0", "-1"], 正確答案: "10", 難度: "困難" },
  { 題目: "3、4、5 三張紙牌任意排成三位數，奇數的機率為？", 選項: ["2/3", "3/4", "2/5", "3/5"], 正確答案: "2/3", 難度: "困難" },
  { 題目: "數列 1,2,2,2,3,3,3,3,3,5,5,6，取小於眾數的機率是多少？", 選項: ["1/2", "1/3", "1/4", "1/5"], 正確答案: "1/3", 難度: "困難" },
  { 題目: "14 個人的年齡為 5、30、36、50、3、55、65、37、4、5、55、40、5、30，何者正確？", 選項: ["眾數:4歲", "中位數:36歲", "全距:60歲", "四分位距:45歲"], 正確答案: "四分位距:45歲", 難度: "困難" },
  { 題目: "阿嘉、小明發現兩人都會到相同的五間藥局買口罩， 為考驗默契兩人打算在同一天購買口罩，若選擇任意藥局的機會均等，則兩人到同一間藥局買口罩的機率為何？", 選項: ["1/2", "1/5", "1/10", "1/25"], 正確答案: "1/5", 難度: "困難" },
  { 題目: "籤筒中有 1 ~ 28 號籤，抽到 2 或 7 的倍數的機率？", 選項: ["1/14", "1/7", "4/7", "9/14"], 正確答案: "4/7", 難度: "困難" },
  { 題目: "某表演廳共有 15 排座位，已知最後一排有 48 個座位，從第二排起每一排都比前一排多 2 個座位，試問該表演廳總共有多少個座位？", 選項: ["490", "510", "520", "528"], 正確答案: "490", 難度: "困難" },
  { 題目: "有一組資料由小排到大為 5、9、28、……、202、203、204、……、333、566。已知中位數是 203，若加入一個數值 309 到這組資料中，則中位數會變成多少？", 選項: ["203", "203.5", "204", "204.5"], 正確答案: "203.5", 難度: "困難" },
  { 題目: "擲骰兩次，第一次點數大於第二次的機率為 p，總和為質數的機率為 q，何者較大？", 選項: ["p = q", "p < q", "p > q", "無法比較"], 正確答案: "p = q", 難度: "困難" }
];

const bonusMap = {
  "簡單": 10,
  "中": 15,
  "困難": 25
};
const penaltyMap = {
  "簡單": 25,
  "中": 15,
  "困難": 10
};

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(80);
  const [currentQ, setCurrentQ] = useState({});
  const [lastQIndex, setLastQIndex] = useState(-1);
  const [hintText, setHintText] = useState("");
  const [streakCorrect, setStreakCorrect] = useState(0);
  const [streakWrong, setStreakWrong] = useState(0);
  const [showIntro, setShowIntro] = useState(true); 
  const [teacherImage, setTeacherImage] = useState("/HappyTeacher.png");



  useEffect(() => {
    if (!showIntro) {
      getNextQuestion();
      const timer = setInterval(() => {
        setProgress(p => {
          const next = Math.max(p - 3, 0);
          if (next === 0) router.push("/fail");
          if (next === 100) router.push("/success");
          return next;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showIntro])

  function getNextQuestion() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questions.length);
    } while (newIndex === lastQIndex && questions.length > 1);

    setLastQIndex(newIndex);
    setCurrentQ(questions[newIndex]);
  }

  function checkAnswer(choice) {
    const isCorrect = choice === currentQ.正確答案;
    const base = isCorrect ? (bonusMap[currentQ.難度] || 5) : -(penaltyMap[currentQ.難度] || 5);
    let bonus = base;    

    if (isCorrect) {
      setStreakCorrect(s => s + 1);
      setStreakWrong(0);
    } else {
      setStreakWrong(s => s + 1);
      setStreakCorrect(0);
    }

    if (streakCorrect >= 2 && isCorrect) {
      bonus += 3;
      setHintText("連續答對三題，老師對你刮目相看，當前答對每題多加3%耐心值～");
    } else if (streakWrong >= 2 && !isCorrect) {
      bonus -= 3;
      setHintText("連續答錯三題，老師對你更加失望，當前答錯每題多扣3%耐心值！");
    } else {
      setHintText("");
    }

    setProgress(p => {
      const next = Math.min(100, Math.max(0, p + bonus));
      if (next === 100) router.push("/success");
      if (next === 0) router.push("/fail");
      return next;
    });

    if (streakCorrect + 1 >= 3 && isCorrect) {
      setTeacherImage("/SurpriseTeacher.png");
    } else if (streakWrong + 1 >= 3 && !isCorrect) {
      setTeacherImage("/AngryTeacher.png");
    } else {
      setTeacherImage("/HappyTeacher.png");
    }
    

    getNextQuestion();
  }

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center p-6 relative"
    style={{
      backgroundImage: `url('/classroom.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
    >
      {!showIntro && (
        <>
          {/* 對話框容器 */}
          <div className="absolute left-[480px] top-[120px] w-[800px] h-[240px] z-20">
            <img
              src="/dialog1.png"
              alt="對話框"
              className="absolute w-full h-full object-contain"
            />
            {/* 題目文字區塊定位在對話框的右上角內部，對齊長方形 */}
            <div className="absolute top-0 right-0 w-[720px] h-[195px] flex items-center justify-center p-4 py-2">
              <div className="text-black text-xl font-bold text-center">
                {currentQ.題目}
              </div>
            </div>
          </div>

          {/* 選項對話框 */}
          <div className="absolute right-[460px] bottom-[150px] w-[410px] h-[260px] z-20">
            <img
              src="/dialog2.png"
              alt="答案對話框"
              className="absolute w-full h-full object-contain"
            />
            <div className="absolute top-0 left-0 w-[380] h-[240px] flex items-center justify-center p-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 w-full h-full p-4">
                {currentQ.選項?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => checkAnswer(opt)}
                    className="bg-amber-300 text-white font-bold text-xl rounded-xl hover:bg-amber-600 p-2"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 老師區塊（包住老師圖＋頭上進度條） */}
      <div className="absolute left-6 bottom-0 w-[400px] md:w-[500px] z-10">
        {/* 頭上的進度條 */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[95%] w-[250px] h-12 bg-white rounded-lg border-3  border-[#42210B] overflow-hidden">
          <div
            className="bg-red-300 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* 老師圖像本體 */}
        <img
          src={teacherImage}
          alt="老師"
          className="w-full drop-shadow-lg"
        />
      </div>
      <img
        src="/studentBack.png"
        alt="學生背影"
        className="absolute right-0 bottom-[-80px] w-[500px] h-auto z-10"
      />


      {showIntro && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
          <div className="bg-white text-black rounded-xl p-8 max-w-md text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">遊戲規則</h2>
            <p className="text-sm mb-2">你被數學老師點名了！答對會讓老師耐心回升，答錯則會減少。</p>
            <p className="text-sm mb-2">連續答對或答錯三題會影響分數加減幅度。</p>
            <p className="text-sm mb-4">當老師的耐心值滿時你就成功了，耐心歸零則失敗。</p>
            <button
              onClick={() => setShowIntro(false)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              開始遊玩
            </button>
          </div>
        </div>
      )}

      {/* {hintText && (
        <div className="absolute top-[400px] left-1/2 -translate-x-1/2 text-xl font-bold text-yellow-200 text-outline z-30">
          {hintText}
        </div>
      )} */}
      <div className="absolute top-[380px] left-1/2 -translate-x-1 text-xl font-bold text-yellow-200 text-outline z-30">
        連續答對三題，老師對你刮目相看，當前答對每題多加3%耐心值～
      </div>


    </main>
  );
}