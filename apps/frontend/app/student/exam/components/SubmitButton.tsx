'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface SubmitButtonProps {
  onSubmit: () => void;
  isDisabled: boolean;
  totalQuestions: number;
  answeredQuestions: number;
}

export function SubmitButton({ 
  onSubmit, 
  isDisabled, 
  totalQuestions, 
  answeredQuestions 
}: SubmitButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="sticky bottom-4 z-10"
    >
      <Card>
        <CardContent className="py-3">
          <Button 
            className="w-full" 
            size="lg"
            onClick={onSubmit}
            disabled={isDisabled}
          >
            Submit Exam
          </Button>
          {answeredQuestions !== totalQuestions && (
            <p className="text-sm text-muted-foreground text-center mt-2 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Please answer all questions before submitting
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}