'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedAnswer?: string;
  onAnswerSelect: (questionId: number, answer: string) => void;
}

export function QuestionCard({ 
  question, 
  index, 
  selectedAnswer, 
  onAnswerSelect 
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">
            {index + 1}. {question.question}
          </h3>
          
          <RadioGroup
            value={selectedAnswer}
            onValueChange={(value) => onAnswerSelect(question.id, value)}
            className="space-y-3"
          >
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option} 
                  id={`q${question.id}-option-${optionIndex}`} 
                />
                <Label htmlFor={`q${question.id}-option-${optionIndex}`}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  );
}