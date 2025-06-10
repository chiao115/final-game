"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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
  { 題目: "(210 / 42) * 16 = ?", 選項: [80, 73, 95, 124], 正確答案: 80, 難度: "中等" },
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
  const [streakCorrect, setStreakCorrect] = useState(0);
  const [streakWrong, setStreakWrong] = useState(0);
  const [teacherImage, setTeacherImage] = useState("/HappyTeacher.png");
  const [hintImage, setHintImage] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const [introStep, setIntroStep] = useState(1); // 1=故事, 2=規則, 0=結束intro
  const correctSound = useRef(null);
  const wrongSound = useRef(null);
  const successSound = useRef(null);
  const failSound = useRef(null);
  const [gameOver, setGameOver] = useState(false);




  useEffect(() => {
    if (!introStep) {
      getNextQuestion();
      const timer = setInterval(() => {
        setProgress(p => Math.max(p - 2, 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [introStep]);

  useEffect(() => {
    if (gameOver) return;
    if (progress === 100) {
      setGameOver(true);
      router.push("/success");
    } else if (progress === 0) {
      setGameOver(true);
      router.push("/fail");
    }
  }, [progress]);
  

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
      correctSound.current?.play();
      
    } else {
      setShakeKey(prev => prev + 1);
      setStreakWrong(s => s + 1);
      setStreakCorrect(0);
      wrongSound.current?.play();
    }

    if (streakCorrect >= 2 && isCorrect) {
      bonus += 3;
      setHintImage("/BonusSign.png");
    } else if (streakWrong >= 2 && !isCorrect) {
      bonus -= 3;
      setHintImage("/DeductSign.png");
    } else {
      setHintImage("");
    }       

    setProgress(p => {
      const next = Math.min(100, Math.max(0, p + bonus));
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
      {/* 音效 */}
      <audio ref={correctSound} src="/correct.mp3" preload="auto" />
      <audio ref={wrongSound} src="/wrong.mp3" preload="auto" />
      {introStep === 0 && (
        <>
          {/* 題目對話框 */}
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
        key={shakeKey}
        src="/StudentBack.png"
        alt="學生背影"
        className="absolute right-0 bottom-[-80px] w-[500px] h-auto z-10 animate-shake"
      />


      {introStep > 0 && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-gray-900 border-10 border-amber-50 text-amber-50 rounded-3xl p-6 w-[800px] text-center">
            {introStep === 1 && (
              <>
                <h1 className="text-3xl font-extrabold mb-4">我重生了，正在廢寢忘食解數學題</h1>
                <p className="text-sm font-medium mb-2">別人都以為我是想通了，但只有我知道，數學考試那天，</p>
                <p className="text-sm font-medium mb-2">全球詭異降臨，所有人將依照數學成績覺醒對應能力。</p>
                <p className="text-sm font-medium mb-2">上一世的我是個數學學渣，連國小數學都會算錯，</p>
                <p className="text-sm font-medium mb-2">最後只覺醒了「按計算機不會按錯鍵」的能力，末世第五天就被空間幾何異獸一腳踩死。</p>
                <p className="text-sm font-medium mb-2">本以為一生就此結束，不曾想重生回到數學模擬考的前一天的數學課上，</p>
                <p className="text-sm font-medium mb-2">我知道數學老師有點背景，得到他的支持能有更大的力量。</p>
                <p className="text-sm font-medium mb-2">這一世，我注定要成為能用三角函數召喚雷電的男人。</p>


                <button onClick={() => setIntroStep(2)} className="mt-1 hover:scale-105 transition-transform">
                  <img
                    src="/NextStep.png"
                    alt="下一步"
                    className="w-[160px] h-auto mx-auto"
                  />
                </button>

              </>
            )}
            {introStep === 2 && (
              <>
                <h2 className="text-3xl font-extrabold mb-4">遊戲規則</h2>
                <p className="text-sm font-medium mb-2">
                  答對提升老師的耐心條，答錯則會讓它迅速下降。
                </p>

                <h2 className="text-xl font-semibold mt-5 mb-1">連鎖效果系統</h2>
                <p className="text-sm font-medium mb-2">
                  <span className="font-bold text-blue-600">連續答對 3 題：</span> 進入「暴擊狀態」，之後每答對一題，老師信任度倍增！
                </p>
                <p className="text-sm font-medium mb-4">
                  <span className="font-bold text-yellow-600">連續答錯 3 題：</span> 進入「信任危機」，老師開始懷疑你根本沒在讀書，之後每錯一題損失更多耐心值。
                </p>

                <h2 className="text-xl font-semibold mt-5 mb-1">遊戲結束條件</h2>
                <p className="text-sm font-medium mb-2">
                  當老師的 <span className="font-bold">耐心條</span> 滿格或清空，這場模擬考將迎來你的命運時刻。
                </p>
                <p className="text-sm font-medium mb-2">
                  是再次醒來發現自己依舊是那個算不出一次函數的廢物，還是以無敵的數學之力征服世界——
                </p>
                <p className="text-sm font-medium mb-4">這次由你決定。</p>

                <button onClick={() => setIntroStep(0)} className="mt-1 hover:scale-105 transition-transform">
                  <img
                    src="/StartPlay.png"
                    alt="開始遊玩"
                    className="w-[160px] h-auto mx-auto"
                  />
                </button>

              </>
            )}
          </div>
        </div>
      )}


      {hintImage && (
        <img
          src={hintImage}
          alt="提示圖"
          className="absolute top-[310px] left-[70%] -translate-x-1/2 w-[450px] z-30
          transform transition duration-300 ease-out scale-100 animate-pop"
        />
      )}

    </main>
  );
}