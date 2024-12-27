'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, Users, Award } from 'lucide-react';

// Mock exam results data
const examResults = [
  { 
    id: 1,
    studentName: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
    rounds: [
      { round: 1, score: 85, totalQuestions: 10, timeTaken: '25:30' },
      { round: 2, status: 'Locked' },
      { round: 3, status: 'Locked' }
    ]
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop',
    rounds: [
      { round: 1, score: 90, totalQuestions: 10, timeTaken: '22:15' },
      { round: 2, status: 'Locked' },
      { round: 3, status: 'Locked' }
    ]
  },
  {
    id: 3,
    studentName: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop',
    rounds: [
      { round: 1, score: 75, totalQuestions: 10, timeTaken: '28:45' },
      { round: 2, status: 'Locked' },
      { round: 3, status: 'Locked' }
    ]
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center">
            <Users className="mr-2" /> Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2" /> Exam Results Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {examResults.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-4 mb-4">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.studentName} />
                                <AvatarFallback>{student.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{student.studentName}</h3>
                                <p className="text-sm text-muted-foreground">{student.email}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              {student.rounds.map((round) => (
                                <div 
                                  key={round.round}
                                  className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                                >
                                  <div className="flex items-center space-x-2">
                                    <Award className="w-4 h-4" />
                                    <span>Round {round.round}</span>
                                  </div>
                                  {round.score ? (
                                    <div className="text-right">
                                      <div className="font-medium">
                                        Score: {round.score}/{round.totalQuestions}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Time: {round.timeTaken}
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">
                                      {round.status}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <p className="text-2xl font-bold">{examResults.length}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-bold">83.3%</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Completed Exams</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Pending Rounds</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}