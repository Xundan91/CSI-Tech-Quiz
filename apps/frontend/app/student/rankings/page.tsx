'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Timer, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RankingsPage() {
  const [selectedTab, setSelectedTab] = useState('APTITUDE');
  const [rankings, setRankings] = useState<Record<string, any[]>>({});

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

        // Group and sort the data by TestType, Score, and Time
        const groupedData = data.reduce((acc: Record<string, any[]>, item: any) => {
          if (!acc[item.TestType]) {
            acc[item.TestType] = [];
          }
          acc[item.TestType].push(item);
          return acc;
        }, {});

        // Sort each group by Score (descending) and Time (ascending)
        Object.keys(groupedData).forEach(testType => {
          groupedData[testType].sort((a:any, b:any) => {
            if (b.Score !== a.Score) {
              return b.Score - a.Score;
            }
            return a.Time - b.Time;
          });
        });

        setRankings(groupedData);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchRankings();
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
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
            <Trophy className="mr-2" /> Student Rankings
          </h1>
          <Link href="/student">
            <Button variant="outline" className="space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Round Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="APTITUDE">Aptitude</TabsTrigger>
                <TabsTrigger value="DSA">DSA</TabsTrigger>
                <TabsTrigger value="ADVANCEDSA">Surprise </TabsTrigger>
              </TabsList>
              {['APTITUDE', 'DSA', 'ADVANCEDSA'].map((testType) => (
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
                            <div className="text-2xl font-bold text-muted-foreground">
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
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}