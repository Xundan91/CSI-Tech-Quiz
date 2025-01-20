'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GraduationCap, PlayCircle, Trophy, Lock, CheckCircle2, Brain, Code, Cpu,Timer,Medal,ArrowRight,PlusCircle,CheckSquare,MinusCircle } from 'lucide-react';
import Link from 'next/link';


// Updated rounds data with backend test type mapping
const rounds = [
  {
    id: 1,
    name: 'Aptitude Test',
    backendType: 'APTITUDE',
    icon: Brain,
    description: 'Test your knowledge across various Aptitude  topics',
    buttonText: 'Start Aptitude Round',
    buttonVariant: 'default' as const,
  },
  {
    id: 2,
    name: 'Data Structure and Algorithm',
    backendType: 'DSA',
    icon: Code,
    description: 'Programming and technical concepts assessment',
    buttonText: 'Start DSA Round',
    buttonVariant: 'secondary' as const,
  },
  {
    id: 3,
    name: 'Surprise Round',
    backendType: 'ADVANCEDSA',
    icon: Cpu,
    description: 'Prepare for the unexpected! Something thrilling is about to happen!',
    buttonText: 'Start the Adventure',
    buttonVariant: 'outline' as const,
}
];

interface TestScore {
  TestType: string;
  questionAttempted?: number;
  correctAnswer?: number;
  percentage?: number;
  message?: string;
  timeTaken?: number; 
}

interface MarksData {
  [key: number]: TestScore;
}



export default function StudentDashboard() {
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [roundTimes, setRoundTimes] = useState<Record<number, string>>({});

  const [studentProfile, setStudentProfile] = useState<{
    name: string;
    email: string;
    course: string;
    avatar: string | null;
  } | null>(null);
  const [marks, setMarks] = useState<MarksData>({});

  useEffect(() => {
    const fetchProfileAndMarks = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch profile
        const profileResponse = await axios.get('https://csi-tech-quiz.onrender.com/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudentProfile({
          name: profileResponse.data.name,
          email: profileResponse.data.email,
          course: 'Computer Science',
          avatar: profileResponse.data.avatar || null,
        });

        // Fetch marks
        const marksResponse = await axios.get<TestScore[]>('https://csi-tech-quiz.onrender.com/api/user/getusermarks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Map fetched marks data to the rounds with proper type assertion
        const marksData = marksResponse.data.reduce<MarksData>((acc, score) => {
          const round = rounds.find((r) => r.backendType === score.TestType);
          if (round) {
            acc[round.id] = score;
          }
          return acc;
        }, {});

        setMarks(marksData);
        
        // Update completed rounds based on marks that have actual scores
        const completed = Object.entries(marksData)
          .filter(([_, score]) => score.correctAnswer !== undefined)
          .map(([roundId]) => Number(roundId));
        setCompletedRounds(completed);
      } catch (error) {
        console.error('Error fetching profile or marks:', error);
      }
    };

    fetchProfileAndMarks();
  }, []);

//  /all round show
  // const getRoundStatus = (roundId: number) => {
  //   if (completedRounds.includes(roundId)) {
  //     return 'completed';
  //   }
  //   if (roundId === 1 || completedRounds.includes(roundId - 1)) {
  //     return 'available';
  //   }
  //   return 'locked';
  // };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///only 1 round

  // const getRoundStatus = (roundId: number) => {
  //   if (completedRounds.includes(roundId)) {
  //     return 'completed';
  //   }
  //   if (roundId === 1) {
  //     return 'available';
  //   }
  //   return 'locked';
  // };


  ///////only round 1 and 2 

  const getRoundStatus = (roundId: number) => {
    if (completedRounds.includes(roundId)) {
      return 'completed';
    }
    
    if (roundId === 1) {
      return 'available';
    }
    
    if (roundId === 2 && completedRounds.includes(1)) {
      return 'available';
    }
    
    return 'locked';
  };



  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center">
            <GraduationCap className="mr-2" /> Student Dashboard
          </h1>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {studentProfile ? (
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    {studentProfile.avatar ? (
                      <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
                    ) : (
                      <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{studentProfile.name}</h2>
                    <p className="text-muted-foreground">{studentProfile.email}</p>
                    <p className="text-primary mt-1">{studentProfile.course}</p>
                  </div>
                </div>
              ) : (
                <p>loading ....</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Rounds */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlayCircle className="mr-2" /> Available Rounds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rounds.map((round, index) => {
                  const status = getRoundStatus(round.id);
                  const Icon = round.icon;

                  return (
                    <motion.div
                      key={round.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-lg bg-card hover:bg-accent/50 transition-colors border"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-5 h-5" />
                            <h3 className="font-medium">
                              Round {round.id}: {round.name}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground max-w-md">
                            {round.description}
                          </p>
                        </div>
                        {status === 'completed' ? (
                          <Button variant="ghost" disabled className="space-x-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Completed</span>
                          </Button>
                        ) : status === 'locked' ? (
                          <Button variant="ghost" disabled className="space-x-2">
                            <Lock className="w-4 h-4" />
                            <span>Complete Previous Round</span>
                          </Button>
                        ) : (
                          <Link href={`/student/exam?round=${round.id}`}>
                            <Button variant={round.buttonVariant} className="space-x-2">
                              <PlayCircle className="w-4 h-4" />
                              <span>{round.buttonText}</span>
                            </Button>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Marks Card */}
{/* Marks Card */}
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.4 }}
>
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center">
          <Trophy className="mr-2" /> Your Marks
        </CardTitle>
        <Link href="/student/rankings">
          <Button variant="outline" className="space-x-2">
            <Medal className="w-4 h-4" />
            <span>View Rankings</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
      {rounds.map((round, index) => {
  const scoreData = marks[round.id];
  const hasScore = scoreData && !scoreData.message && scoreData.correctAnswer !== undefined;
  
  // Set total questions based on round
  const totalQuestions = round.id === 1 ? 35 : round.id === 2 ? 45 : 10;
  const maxScore = totalQuestions * 5; // Calculate max score based on total questions
  
  const correctAnswers = hasScore ? (scoreData.correctAnswer ?? 0) : 0;
  const questionAttempted = hasScore ? (scoreData.questionAttempted ?? totalQuestions) : totalQuestions;
  const wrongAnswers = hasScore ? (questionAttempted - correctAnswers) : 0;
  const positiveScore = correctAnswers * 5;  // 5 points for each correct answer
  const negativeScore = wrongAnswers * 2;    // -2 points for each wrong answer
  const totalScore = positiveScore - negativeScore;

  const percentage = hasScore ? (totalScore / maxScore * 100) : 0;

  const timeTaken = hasScore && scoreData.timeTaken ? scoreData.timeTaken : null;
          return (
            <motion.div
            key={round.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-lg bg-card hover:bg-accent/50 transition-colors border"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-lg">{round.name}</h3>
              <div className="text-right">
                {timeTaken ? (
                  <div className="flex items-center text-sm text-muted-foreground justify-end">
                    <Timer className="w-4 h-4 mr-1" />
                    Time: {formatTime(timeTaken)}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Time: --:--
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {hasScore ? 'Completed' : (scoreData?.message || 'Not attempted')}
                </p>
              </div>
            </div>
      
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Positive Score: </span>
                <span className="font-semibold text-green-500">+{positiveScore}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MinusCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm">Negative Score: </span>
                <span className="font-semibold text-red-500">-{negativeScore}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-primary" />
                <span className="text-sm">Correct Answers: </span>
                <span className="font-semibold">{correctAnswers}/{totalQuestions}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Total Score: </span>
                <span className="font-semibold">{totalScore}</span>
              </div>
            </div>
      
            <div className="space-y-2">
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Score: {percentage?.toFixed(1)}%</span>
                <span>Max Score: {maxScore}</span>
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>
    </CardContent>
  </Card>
</motion.div>


      </motion.div>
    </div>
  );
}
