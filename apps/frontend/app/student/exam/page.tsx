'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Timer, AlertCircle, Trophy, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { examQuestions } from './questions';
import { useRouter } from 'next/navigation';
import axios from "axios"

export default function ExamPage() {
  const [roundStarted, setRoundStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [redirectCountdown, setRedirectCountdown] = useState(15);
  const { toast } = useToast();
  const router = useRouter();

  // useEffect(() => {
  //   const completed = localStorage.getItem('examCompleted');
  //   if (completed === 'true') {
  //     toast({
  //       title: "Exam Already Completed",
  //       description: "You cannot retake this exam.",
  //       variant: "destructive"
  //     });
  //     router.push('/student');
  //   }
  // }, []);

  useEffect(() => {
    if (roundStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [roundStarted, timeLeft]);

  useEffect(() => {
    if (examCompleted) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/student');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => setRoundStarted(true);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    const calculatedScore = Object.entries(answers).reduce((acc, [questionId, answer]) => {
      const question = examQuestions.find(q => q.id === parseInt(questionId));
      if (question && question.correctAnswer === answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(calculatedScore);
    localStorage.setItem('examCompleted', 'true');
    setExamCompleted(true);
  };

  if (examCompleted) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg mx-auto p-4"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
            <CardContent className="pt-6 text-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              >
                <Trophy className="w-8 h-8 text-primary" />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-2">Thank You for Participating!</h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <PartyPopper className="w-5 h-5 text-primary" />
                  <span className="text-xl font-semibold">CSI Event 2024</span>
                  <PartyPopper className="w-5 h-5 text-primary" />
                </div>
                <p className="text-lg mb-6">
                  Your Score: <span className="font-bold">{score}</span> out of {examQuestions.length}
                </p>
                <Button 
                  size="lg"
                  onClick={() => router.push('/student')}
                  className="w-full mb-4"
                >
                  Return to Dashboard
                </Button>
                <p className="text-sm text-muted-foreground">
                  Auto-redirecting in {redirectCountdown} seconds...
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!roundStarted) {
    return (
      <div className="min-h-screen bg-background p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Round 1: General Knowledge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Instructions:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>You have 30 minutes to complete this exam</li>
                  <li>There are {examQuestions.length} multiple choice questions</li>
                  <li>Each question has only one correct answer</li>
                  <li>You cannot retake this exam once submitted</li>
                  <li>The exam will auto-submit when time expires</li>
                </ul>
              </div>
              <Button 
                size="lg" 
                className="w-full mt-6" 
                onClick={handleStartExam}
              >
                Start Exam
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <Card className="sticky top-4 z-10 mb-4">
          <CardContent className="py-3 flex justify-between items-center">
            <span className="font-semibold">
              Round 1: General Knowledge
            </span>
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <Timer className="w-5 h-5" />
              <span className={timeLeft < 300 ? 'text-destructive' : ''}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {examQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">
                    {index + 1}. {question.question}
                  </h3>
                  
                  <RadioGroup
                    value={answers[question.id]}
                    onValueChange={(value) => handleAnswer(question.id, value)}
                    className="space-y-3"
                  >
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${question.id}-option-${optionIndex}`} />
                        <Label htmlFor={`q${question.id}-option-${optionIndex}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="sticky bottom-4 z-10"
        >
          <Card>
            <CardContent className="py-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== examQuestions.length}
              >
                Submit Exam
              </Button>
              {Object.keys(answers).length !== examQuestions.length && (
                <p className="text-sm text-muted-foreground text-center mt-2 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Please answer all questions before submitting
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}