'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Question, ExamState } from '../types';

export function useExam(questions: Question[]) {
  const [state, setState] = useState<ExamState>({
    answers: {},
    timeLeft: 30 * 60,
    isCompleted: false
  });
  const [roundStarted, setRoundStarted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const completed = localStorage.getItem('examCompleted');
    if (completed === 'true') {
      toast({
        title: "Exam Already Completed",
        description: "You cannot retake this exam.",
        variant: "destructive"
      });
      router.push('/student');
    }
  }, []);

  useEffect(() => {
    if (roundStarted && state.timeLeft > 0) {
      const timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft <= 1 ? 0 : prev.timeLeft - 1
        }));
      }, 1000);

      if (state.timeLeft <= 1) {
        handleSubmit();
      }

      return () => clearInterval(timer);
    }
  }, [roundStarted, state.timeLeft]);

  const handleStartExam = () => setRoundStarted(true);

  const handleAnswer = (questionId: number, answer: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer }
    }));
  };

  const handleSubmit = () => {
    const score = Object.entries(state.answers).reduce((acc, [questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      return question?.correctAnswer === answer ? acc + 1 : acc;
    }, 0);

    localStorage.setItem('examCompleted', 'true');
    setState(prev => ({ ...prev, isCompleted: true }));

    

    toast({
      title: "Exam Submitted!",
      description: `You scored ${score} out of ${questions.length}`,
    });

    setTimeout(() => router.push('/student'), 3000);
  };

  return {
    state,
    roundStarted,
    handleStartExam,
    handleAnswer,
    handleSubmit
  };
}