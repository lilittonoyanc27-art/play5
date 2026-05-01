import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Rocket, 
  Info, 
  RotateCcw, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { PODER_DATA, PODER_CONJUGATION, PoderQuestion } from './constants';

type GameState = 'start' | 'theory' | 'playing' | 'results';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shuffledQuests, setShuffledQuests] = useState<PoderQuestion[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (gameState === 'start' || gameState === 'playing') {
      setShuffledQuests([...PODER_DATA].sort(() => 0.5 - Math.random()));
    }
  }, [gameState === 'start']);

  const startGame = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setShowExplanation(false);
  };

  const handleAnswer = (answer: string) => {
    if (feedback) return;
    
    if (answer === shuffledQuests[currentIndex].correct) {
      setScore(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setFeedback(null);
    setShowExplanation(false);
    if (currentIndex < 14) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex flex-col overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <header className="bg-slate-900/60 backdrop-blur-md border-b border-white/5 px-6 py-4 z-50 sticky top-0 shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg text-white border border-indigo-400/30">
              <Rocket size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">ՏԻԵԶԵՐԱԿԱՆ ՈՒՍՈՒՑՈՒՄ</p>
              <h1 className="text-xl font-black text-white leading-none">PODER ԲԱՅԸ</h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">ԱՌԱՋԸՆԹԱՑ</span>
              <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500" 
                  animate={{ width: `${((currentIndex + (gameState === 'results' ? 1 : 0)) / 15) * 100}%` }}
                />
              </div>
            </div>
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/50 flex items-center gap-3">
              <Trophy size={16} className="text-yellow-500" />
              <span className="font-black text-lg text-indigo-400">{score}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center space-y-10"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="inline-block mb-4"
                >
                  <Rocket size={120} className="text-indigo-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
                </motion.div>
                <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white">
                  PODER <span className="text-indigo-500 block">SPACE</span>
                </h2>
                <p className="text-slate-400 font-bold uppercase text-sm tracking-[0.4em] max-w-xl mx-auto">
                  Սովորիր 'կարողանալ' բայը և թռիր դեպի աստղերը
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <button 
                  onClick={() => setGameState('theory')}
                  className="px-12 py-6 bg-slate-800/50 border-2 border-indigo-500/50 text-indigo-400 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl backdrop-blur-sm"
                >
                  <Info size={24} /> Տեսություն
                </button>
                <button 
                  onClick={startGame}
                  className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-indigo-500 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(79,70,229,0.4)]"
                >
                  Սկսել Մարզումը <ArrowRight size={24} />
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'theory' && (
            <motion.div 
              key="theory"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-700 shadow-2xl ring-1 ring-white/5">
                <h2 className="text-4xl font-black text-indigo-400 mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                  <Sparkles size={32} /> "PODER" (Կարողանալ)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PODER_CONJUGATION.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                      <span className="font-bold text-slate-500 uppercase text-xs tracking-widest">{item.subject}</span>
                      <span className="font-black text-white text-2xl tracking-tight leading-none">{item.conjugation}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-slate-300">
                  <div className="flex items-center gap-3 mb-3">
                     <Info size={20} className="text-indigo-400" />
                     <p className="font-black text-white uppercase text-sm tracking-widest">Կարևոր Կանոն</p>
                  </div>
                  <p className="italic font-medium leading-relaxed">
                    Poder-ը անկանոն բայ է: Արմատի <span className="text-indigo-400 font-bold">O</span>-ն դառնում է <span className="text-indigo-400 font-bold">UE</span>: 
                    Բայց ուշադիր եղեք՝ <span className="text-white font-bold">Nosotros</span> և <span className="text-white font-bold">Vosotros</span> դեմքերում փոփոխություն տեղի չի ունենում:
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                   onClick={() => setGameState('start')}
                   className="py-6 px-8 bg-slate-800 text-slate-400 rounded-3xl font-black text-xl uppercase tracking-widest hover:text-white transition-all flex items-center gap-2"
                >
                   <ChevronLeft />
                </button>
                <button 
                  onClick={startGame}
                  className="flex-1 py-6 bg-indigo-600 text-white rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl"
                >
                  Սկսել Վարժությունները <ChevronRight className="inline ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="text-center space-y-10">
                <div className="relative inline-block max-w-4xl w-full">
                  <div className="absolute -inset-10 bg-indigo-500/5 blur-[50px] rounded-full pointer-events-none" />
                  <h2 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-[1.2]">
                    {shuffledQuests[currentIndex]?.sentence.split('____').map((part, i) => (
                      <React.Fragment key={i}>
                        {part}
                        {i === 0 && (
                          <span className={`inline-block border-b-4 mx-4 transition-all duration-300 px-6 min-w-[140px] ${feedback ? (feedback === 'correct' ? 'text-emerald-400 border-emerald-400 scale-105' : 'text-rose-500 border-rose-500 scale-105') : 'text-indigo-500 border-indigo-900/50 border-dashed'}`}>
                            {feedback ? shuffledQuests[currentIndex].correct : '????'}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
                  {shuffledQuests[currentIndex]?.options.map((opt, i) => (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(opt)}
                      className={`
                        relative group py-8 px-6 rounded-3xl font-black text-2xl italic uppercase transition-all shadow-xl border-2 overflow-hidden
                        ${feedback && opt === shuffledQuests[currentIndex].correct 
                          ? 'bg-emerald-500 border-emerald-400 text-white scale-105 z-10' 
                          : feedback && opt !== shuffledQuests[currentIndex].correct
                            ? 'bg-slate-900/20 border-slate-800 text-slate-700 opacity-40 grayscale pointer-events-none'
                            : 'bg-slate-800/40 border-slate-700 text-white hover:border-indigo-500 hover:bg-slate-800 hover:-translate-y-1 active:scale-95'
                        }
                      `}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 bg-slate-800/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-700 max-w-2xl mx-auto text-left shadow-2xl relative overflow-hidden"
                    >
                       <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
                       <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${feedback === 'correct' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            <Info size={24} />
                          </div>
                          <div className="flex-1">
                            <p className="font-black text-white uppercase italic tracking-widest text-xs mb-2 opacity-50">Ինչու՞ այսպես</p>
                            <p className="text-slate-300 leading-relaxed font-bold text-lg">{shuffledQuests[currentIndex].explanation}</p>
                            <button 
                              onClick={handleNext}
                              className="mt-8 flex items-center justify-center gap-3 bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-lg group w-full"
                            >
                               {currentIndex === 14 ? 'ՏԵՍՆԵԼ ԱՐԴՅՈՒՆՔԸ' : 'ՇԱՐՈՒՆԱԿԵԼ'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback && !showExplanation && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]"
                  >
                    {feedback === 'correct' ? (
                       <div className="flex flex-col items-center">
                          <CheckCircle2 size={160} className="text-emerald-400 drop-shadow-[0_0_40px_rgba(52,211,153,0.5)]" />
                          <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl font-black italic text-emerald-400 mt-6 tracking-tighter"
                          >
                             ՃԻՇՏ Է!
                          </motion.span>
                       </div>
                    ) : (
                       <div className="flex flex-col items-center">
                          <AlertCircle size={160} className="text-rose-500 drop-shadow-[0_0_40px_rgba(244,63,94,0.5)]" />
                          <motion.span 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl font-black italic text-rose-500 mt-6 uppercase tracking-tighter"
                          >
                             ՍԽԱԼ Է
                          </motion.span>
                       </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-12"
            >
              <div className="relative inline-block">
                <div className={`w-64 h-64 rounded-[4rem] rotate-12 flex flex-col items-center justify-center mx-auto shadow-2xl border-4 border-white/10 transition-all duration-1000 ${score > 10 ? 'bg-indigo-600 shadow-indigo-500/40' : 'bg-slate-700'}`}>
                  <Trophy size={100} className="text-white -rotate-12 mb-2" />
                  <span className="text-white font-black text-4xl -rotate-12 leading-none">{score} / 15</span>
                </div>
                {score >= 14 && <Sparkles size={60} className="absolute -top-6 -right-6 text-yellow-400 animate-pulse" />}
              </div>
              
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black italic uppercase text-white tracking-tighter leading-[0.85]">
                  {score === 15 ? "ԳԵՐԱԶԱՆՑ!" : score >= 10 ? "ԼԱՎ ԱՐԴՅՈՒՆՔ" : "ՇԱՐՈՒՆԱԿԻՐ ՍՈՎՈՐԵԼ"}
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-sm">
                  ԴՈՒՔ ՊԱՏԱՍԽԱՆԵՑԻՔ {score} ՀԱՐՑԻ 15-ԻՑ
                </p>
              </div>

              <button 
                onClick={() => setGameState('start')}
                className="mt-12 px-16 py-8 bg-indigo-600 text-white rounded-3xl font-black text-2xl uppercase tracking-widest hover:bg-slate-800 shadow-2xl transition-all flex items-center justify-center gap-4 mx-auto group active:scale-95"
              >
                <RotateCcw size={28} className="group-hover:rotate-180 transition-transform duration-500" /> ՎԵՐԱՍԿՍԵԼ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="px-8 py-10 text-center">
        <div className="max-w-xs mx-auto h-1 bg-slate-900 rounded-full mb-4" />
        <p className="text-slate-600 font-black italic uppercase tracking-[0.3em] text-[10px]">
          PODER ACADEMY • 15 STEP TRAINING • 2026
        </p>
      </footer>
    </div>
  );
}
