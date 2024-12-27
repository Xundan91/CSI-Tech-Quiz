'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExamInstructionsProps {
  questionCount: number;
  onStart: () => void;
}

export function ExamInstructions({ questionCount, onStart }: ExamInstructionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Round 1: General Knowledge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Instructions:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>You have 30 minutes to complete this exam</li>
              <li>There are {questionCount} multiple choice questions</li>
              <li>Each question has only one correct answer</li>
              <li>You cannot retake this exam once submitted</li>
              <li>The exam will auto-submit when time expires</li>
            </ul>
          </div>
          <Button 
            size="lg" 
            className="w-full mt-6" 
            onClick={onStart}
          >
            Start Exam
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}