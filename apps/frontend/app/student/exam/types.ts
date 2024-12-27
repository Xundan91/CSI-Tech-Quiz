export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ExamState {
  answers: Record<number, string>;
  timeLeft: number;
  isCompleted: boolean;
}