'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  name: string;
  email: string;
  course?: string;
}

const rounds = [
  { id: 1, name: 'General Knowledge', status: 'Not Started', date: 'Available Now' },
  { id: 2, name: 'Technical Skills', status: 'Locked', date: 'Opens after Round 1' },
  { id: 3, name: 'Advanced Concepts', status: 'Locked', date: 'Opens after Round 2' },
];

export default function StudentDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/'; // Redirect to login if no token
          return;
        }

        const response = await fetch('http://localhost:8080/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
        
        console.log(token);
        

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile",
        });
      }
    };

    fetchUserData();
  }, [toast]);

  if (!userData) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      Loading...
    </div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
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
                          <Button>
                            Start Round
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" disabled>
                          {round.status}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}