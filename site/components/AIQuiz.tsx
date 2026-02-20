
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { getAssessmentDiagnosis } from '../services/gemini';

const AIQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOption = async (option: string) => {
    const newAnswers = [...answers, option];
    if (step < QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      setAnswers(newAnswers);
      setLoading(true);
      const res = await getAssessmentDiagnosis(newAnswers);
      setDiagnosis(res || "Seu perfil é promissor. Recomendo o Método PRIME para começar.");
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setDiagnosis(null);
  };

  return (
    <div className="max-w-2xl mx-auto glass-card p-8 rounded-3xl border border-amber-500/20 shadow-xl">
      {!diagnosis ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Diagnóstico AI</span>
            <span className="text-slate-500 text-sm">Passo {step + 1} de {QUIZ_QUESTIONS.length}</span>
          </div>
          <h3 className="text-2xl font-bold font-display">{QUIZ_QUESTIONS[step].text}</h3>
          <div className="grid gap-3">
            {QUIZ_QUESTIONS[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOption(opt)}
                disabled={loading}
                className="w-full text-left p-4 rounded-xl border border-slate-700 hover:border-amber-500 hover:bg-amber-500/5 transition-all text-slate-300 hover:text-white"
              >
                {opt}
              </button>
            ))}
          </div>
          {loading && <div className="text-center text-amber-500 animate-pulse mt-4">A Inteligência Artificial está a analisar o seu perfil...</div>}
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-3xl font-display font-bold gold-gradient">O Seu Caminho para a Abundância</h3>
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-amber-500/10 italic text-slate-200 leading-relaxed whitespace-pre-line">
            "{diagnosis}"
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={reset} className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">Refazer</button>
            <button className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-600 transition-colors flex-1">Falar com Consultor Agora</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIQuiz;
