import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Question } from './questions'; // Import the Question type

interface QuestionRendererProps {
  question: Question;
  value: string;
  onAnswer: (value: string) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  value,
  onAnswer,
}) => {
  const [isValid, setIsValid] = useState(true);

  const renderMultipleChoice = () => {
    if ('options' in question) {
      return (
        <RadioGroup value={value} onValueChange={onAnswer} className="space-y-3">
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`q${question.id}-option-${optionIndex}`} />
              <Label htmlFor={`q${question.id}-option-${optionIndex}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    }
    return null; // Ensure it returns null explicitly
  };

  const renderImageChoice = () => {
    if (question.type === 'image-choice' && 'imageSrc' in question) {
      return (
        <div className="space-y-4">
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <img 
              src={question.imageSrc} 
              alt="Question visualization" 
              className="w-full h-auto"
            />
          </div>
          {renderMultipleChoice()}
        </div>
      );
    }
    return null; // Ensure it returns null explicitly
  };

  const renderUserInput = () => {
    if (question.type === 'user-input' && 'placeholder' in question) {
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const isValidInput = !question.validation || question.validation.test(newValue);
        setIsValid(isValidInput);
        onAnswer(newValue);
      };

      return (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder={question.placeholder}
            value={value || ''}
            onChange={handleInputChange}
            className={`w-full ${!isValid ? 'border-destructive' : ''}`}
          />
          {!isValid && (
            <p className="text-sm text-destructive">
              Please enter a valid response
            </p>
          )}
        </div>
      );
    }
    return null; // Ensure it returns null explicitly
  };

  // Ensure all cases return a valid ReactNode
  switch (question.type) {
    case 'image-choice':
      return <>{renderImageChoice()}</>; // Wrap in a fragment
    case 'user-input':
      return <>{renderUserInput()}</>; // Wrap in a fragment
    case 'multiple-choice':
      return <>{renderMultipleChoice()}</>; // Wrap in a fragment
    default:
      return <p>Unsupported question type</p>; // Fallback for unsupported types
  }
};

export default QuestionRenderer;
