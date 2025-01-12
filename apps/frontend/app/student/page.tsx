'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GraduationCap, PlayCircle, Trophy, Lock, CheckCircle2, Brain, Code, Cpu } from 'lucide-react';
import Link from 'next/link';

// Mock rounds data
const rounds = [
  {
    id: 1,
    name: 'General Knowledge',
    icon: Brain,
    description: 'Test your knowledge across various general topics',
    buttonText: 'Start General Knowledge Round',
    buttonVariant: 'default' as const,
  },
  {
    id: 2,
    name: 'Technical Skills',
    icon: Code,
    description: 'Programming and technical concepts assessment',
    buttonText: 'Start Technical Round',
    buttonVariant: 'secondary' as const,
  },
  {
    id: 3,
    name: 'Advanced Concepts',
    icon: Cpu,
    description: 'Complex programming and system design challenges',
    buttonText: 'Start Advanced Round',
    buttonVariant: 'outline' as const,
  },
];

export default function StudentDashboard() {
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [studentProfile, setStudentProfile] = useState<{
    name: string;
    email: string;
    course: string; // Assuming 'course' field exists in backend response
    avatar: string | null; // If avatar URL exists
  } | null>(null);

  useEffect(() => {
    // Fetch the student profile from the API using Axios
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");         
        // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:8081/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update profile with response data
        setStudentProfile({
          name: response.data.name,
          email: response.data.email,
          
          course: "Computer Science", // You can modify this to match actual course data
          avatar: response.data.avatar || null, // Assuming the backend might return an avatar URL
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    // Check which rounds are completed
    const completed = rounds.map((round) => {
      return localStorage.getItem(`examCompleted_${round.id}`) === 'true';
    });
    setCompletedRounds(
      completed.reduce((acc, curr, idx) => {
        if (curr) acc.push(idx + 1);
        return acc;
      }, [] as number[])
    );
  }, []);

  const getRoundStatus = (roundId: number) => {
    if (completedRounds.includes(roundId)) {
      return 'completed';
    }
    if (roundId === 1 || completedRounds.includes(roundId - 1)) {
      return 'available';
    }
    return 'locked';
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
                <p>Loading profile...</p>
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
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2" /> Your Marks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rounds.map((round, index) => {
                  const completed = completedRounds.includes(round.id);
                  const score = completed ? Math.floor(Math.random() * 5 + 5) : 0; // Mock score between 5-10
                  
                  return (
                    <motion.div
                      key={round.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{round.name}</h3>
                        <div className="text-right">
                          <span className="text-lg font-semibold">
                            {score}/10
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {completed ? 'Completed' : 'Not attempted'}
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all duration-500"
                          style={{ width: `${(score / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Score: {((score / 10) * 100).toFixed(1)}%
                      </p>
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
