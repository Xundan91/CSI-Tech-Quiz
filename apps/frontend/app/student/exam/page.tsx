'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Timer, AlertCircle, PartyPopper, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { roundConfigs } from './questions';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// Confirmation Dialog Component with TypeScript props
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md mx-auto p-4"
      >
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Confirm Submission</h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to submit your exam? This action cannot be undone.
            </p>
            <div className="flex space-x-4 justify-center">
              <Button variant="outline" onClick={onCancel}>
                No, Continue Exam
              </Button>
              <Button onClick={onConfirm}>
                Yes, Submit Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};



export default function ExamPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roundId = parseInt(searchParams.get('round') || '1');
  const roundConfig = roundConfigs[roundId];

  const [roundStarted, setRoundStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(roundConfig.timeLimit * 60);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [redirectCountdown, setRedirectCountdown] = useState(15);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const { toast } = useToast();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://csi-tech-quiz.onrender.com/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.id) {
          setUserId(response.data.id);
        } else {
          throw new Error("User ID not found in profile response.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "Error",
          description: "Failed to fetch user profile.",
          variant: "destructive",
        });
        router.push('/');
      }
    };

    fetchUserProfile();
  }, []);

  // Timer Effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft <= 300) {
      handleSubmitConfirmed();
    }
  }, [roundStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setRoundStarted(true);
  };

  useEffect(() => {
    if (examCompleted) {
      const redirectTimer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(redirectTimer);
            router.push('/student');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(redirectTimer);
    }
  }, [examCompleted]);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Modified submission handling
  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleSubmitConfirmed = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please login again.",
        variant: "destructive",
      });
      return;
    }
  
    // Calculate scores based on answers
    const totalQuestions = roundConfig.questions.length;
    const answeredQuestions = Object.keys(answers).length;
    
    // Calculate correct answers and scores
    const correctAnswers = roundConfig.questions.reduce((acc, question) => {
      if (answers[question.id] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  
    // Calculate positive and negative scores
    const positiveScore = correctAnswers * 5; // +5 for each correct answer
    const wrongAnswers = answeredQuestions - correctAnswers;
    const negativeScore = wrongAnswers * 2; // -2 for each wrong answer
    const totalScore = positiveScore - negativeScore;
  
    setScore(correctAnswers); // Update the score state for display
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Authentication token not found.");
      }
  
      const totalTimeTaken = 45 * 60 - timeLeft;
  
      const requestData = {
        userid: userId,
        questionattempted: answeredQuestions,
        correctAnswer: correctAnswers,
        Totaltime: totalTimeTaken,
        TotalcorrectAnswerScore: totalScore,
        positiveAnswerScore: positiveScore,
        wrongAnswerScore: negativeScore
      };
  
      // Determine which endpoint to use based on roundId
      const endpoints = [
        'https://csi-tech-quiz.onrender.com/api/user/aptitude',
        'https://csi-tech-quiz.onrender.com/api/user/advancedsa',
        'https://csi-tech-quiz.onrender.com/api/user/superadvancedsa',
      ];
  
      const endpoint = endpoints[roundId - 1];
      if (!endpoint) throw new Error("Invalid round ID.");
  
      const response = await axios.post(endpoint, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        localStorage.setItem(`examCompleted_${roundId}`, 'true');
        setExamCompleted(true);
  
        // Show score breakdown in toast
        toast({
          title: "Exam Submitted Successfully",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your exam.",
        variant: "destructive",
      });
    }
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {examCompleted && (
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
                    
                    Your correct question: <span className="font-bold">{score}</span> out of {roundConfig.questions.length}
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
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <Card className="sticky top-4 z-10 mb-4">
          <CardContent className="py-3 flex justify-between items-center">
            <span className="font-semibold">
              Round {roundId}: {roundConfig.title}
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
          {roundConfig.questions.map((question, index) => (
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
              >
                Submit Exam
              </Button>
              {Object.keys(answers).length !== roundConfig.questions.length && (
                <p className="text-sm text-muted-foreground text-center mt-2 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Please answer all questions before submitting
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          <ConfirmationDialog 
            isOpen={showConfirmation}
            onConfirm={handleSubmitConfirmed}
            onCancel={() => setShowConfirmation(false)}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}