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
  const [rankings, setRankings] = useState<Record<string, any[]>>({});
  const [overallRankings, setOverallRankings] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState('APTITUDE');

  useEffect(() => {
    const fetchAllRankings = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch round-wise rankings
        const roundResponse = await fetch('https://csi-tech-quiz.onrender.com/api/user/rankings', {
          headers,
        });
        const roundData = await roundResponse.json();
        
        // Group and sort the round data
        const groupedData = roundData.reduce((acc: Record<string, any[]>, item: any) => {
          if (!acc[item.TestType]) {
            acc[item.TestType] = [];
          }
          acc[item.TestType].push(item);
          return acc;
        }, {});

        // Sort each group
        Object.keys(groupedData).forEach(testType => {
          groupedData[testType].sort((a: any, b: any) => {
            if (b.Score !== a.Score) {
              return b.Score - a.Score;
            }
            return a.Time - b.Time;
          });
        });

        setRankings(groupedData);

        // Fetch overall rankings
        const overallResponse = await fetch('https://csi-tech-quiz.onrender.com/api/user/sumrankings', {
          headers,
        });
        const overallData = await overallResponse.json();
        setOverallRankings(overallData);

      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchAllRankings();
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

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

        {/* Overall Rankings Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2" /> Overall Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overallRankings.map((student, index) => (
                  <motion.div
                    key={student.user.id}
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
                          <AvatarFallback>{student.user.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.user.name}</p>
                          <p className="text-sm text-muted-foreground">{student.user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {student.averagePercentage.toFixed(2)}%
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground justify-end">
                          <Timer className="w-4 h-4 mr-1" />
                          Total Time: {formatTime(student.totalTime)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Round-wise Rankings Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2" /> Round Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="APTITUDE">Aptitude</TabsTrigger>
                  <TabsTrigger value="DSA">DSA</TabsTrigger>
                  <TabsTrigger value="ADVANCEDSA">Surprise</TabsTrigger>
                </TabsList>
                {['APTITUDE', 'DSA', 'ADVANCEDSA'].map((testType) => {
                  const RoundIcon = roundIcons[testType];
                  return (
                    <TabsContent key={testType} value={testType}>
                      <div className="space-y-4">
                        {rankings[testType]?.map((student, index) => (
                          <motion.div
                            key={student.User.id}
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
                                  <AvatarFallback>{student.User.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{student.User.name}</p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Timer className="w-4 h-4 mr-1" />
                                    Time: {formatTime(student.Time)}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold">{student.Score} Marks</p>
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