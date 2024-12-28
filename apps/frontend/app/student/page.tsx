"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlayCircle, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  name: string;
  email: string;
  course?: string;
}

interface ExamScore {
  id: number;
  questionsAttempted: number;
  correctAnswers: number;
  percentage: number;
  testDate: string;
}

const rounds = [
  { id: 1, name: 'General Knowledge', status: 'Not Started', date: 'Available Now' },
  { id: 2, name: 'Technical Skills', status: 'Locked', date: 'Opens after Round 1' },
  { id: 3, name: 'Advanced Concepts', status: 'Locked', date: 'Opens after Round 2' },
];

export default function StudentDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [examScores, setExamScores] = useState<ExamScore[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/'; // Redirect to login if no token
          return;
        }

        // Using Axios for API requests
        const profileResponse = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(profileResponse.data);

        const submissionsResponse = await axios.get('http://localhost:8080/api/user/test-submissions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExamScores(
          submissionsResponse.data.data.length > 0
            ? submissionsResponse.data.data
            : [
                {
                  id: 0,
                  questionsAttempted: 0,
                  correctAnswers: 0,
                  percentage: 0,
                  testDate: '',
                },
              ]
        );
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: (error as Error).message,
        });
      }
    };

    fetchUserData();
  }, [toast]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Student Profile Card */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-muted-foreground">{userData.email}</p>
                  {userData.course && <p className="text-primary mt-1">{userData.course}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Rounds Card */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlayCircle className="mr-2" /> Available Rounds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rounds.map((round, index) => (
                  <motion.div
                    key={round.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Round {round.id}: {round.name}</h3>
                        <p className="text-sm text-muted-foreground">{round.date}</p>
                      </div>
                      {round.status === 'Not Started' ? (
                        <Link href="/student/exam">
                          <Button>Start Round</Button>
                        </Link>
                      ) : (
                        <Button variant="outline" disabled>{round.status}</Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Exam Scores Card */}
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2" /> Exam Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {examScores.map((score) => (
                  <div key={score.id} className="p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors">
                    <h3 className="font-medium">Test ID: {score.id}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-lg font-semibold text-primary">
                        Correct Answers: {score.correctAnswers}/{score.questionsAttempted}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Percentage: {score.percentage}%
                      </p>
                      {score.testDate && (
                        <p className="text-sm text-muted-foreground">
                          Date: {new Date(score.testDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
