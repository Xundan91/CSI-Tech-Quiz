'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Timer } from 'lucide-react';

interface ExamTimerProps {
  timeLeft: number;
}

export function ExamTimer({ timeLeft }: ExamTimerProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
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
  );
}