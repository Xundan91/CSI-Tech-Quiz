'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Timer, Trophy, Brain, Code, Cpu } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const roundIcons: Record<string, React.FC<any>> = {
  'APTITUDE': Brain,
  'DSA': Code,
  'ADVANCEDSA': Cpu,
};

const rankColors: Record<1 | 2 | 3, string> = {
  1: 'text-yellow-500 font-bold',
  2: 'text-gray-400 font-bold',
  3: 'text-amber-600 font-bold',
};

export default function AdminDashboard() {
  const [rankings, setRankings] = useState<any>({});
  const [selectedTab, setSelectedTab] = useState('APTITUDE');

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://csi-tech-quiz.onrender.com/api/user/rankings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setRankings(data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchRankings();
  }, []);

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

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2" /> Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="APTITUDE">Aptitude</TabsTrigger>
                  <TabsTrigger value="DSA">DSA</TabsTrigger>
                  <TabsTrigger value="ADVANCEDSA">Advanced DSA</TabsTrigger>
                </TabsList>
                {['APTITUDE', 'DSA', 'ADVANCEDSA'].map((roundName) => {
                  const RoundIcon = roundIcons[roundName];
                  return (
                    <TabsContent key={roundName} value={roundName}>
                      <div className="space-y-4">
                        {rankings[roundName]?.map((student: any, index: number) => (
                          <motion.div
                            key={student.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors border"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`text-2xl font-bold min-w-[2rem] ${
                                  rankColors[(index + 1) as 1 | 2 | 3] || 'text-muted-foreground'
                                }`}>
                                  #{index + 1}
                                </div>
                                <Avatar>
                                  <AvatarImage src={student.User.avatar || ''} alt={student.User.name} />
                                  <AvatarFallback>{student.User.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{student.User.name}</p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Timer className="w-4 h-4 mr-1" />
                                    Time: {student.Totaltime ? 
                                      `${Math.floor(student.Totaltime / 60)}:${String(student.Totaltime % 60).padStart(2, '0')}` 
                                      : 'N/A'}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold">{student.TotalcorrectAnswerScore} Marks</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}