'use client';

import { examQuestions } from './questions';
import { ExamInstructions } from './components/ExamInstructions';
import { ExamTimer } from './components/ExamTimer';
import { QuestionCard } from './components/QuestionCard';
import { SubmitButton } from './components/SubmitButton';
import { useExam } from './hooks/useExam';

export default function ExamPage() {
  const {
    state,
    roundStarted,
    handleStartExam,
    handleAnswer,
    handleSubmit
  } = useExam(examQuestions);

  if (!roundStarted) {
    return (
      <div className="min-h-screen bg-background p-8">
        <ExamInstructions 
          questionCount={examQuestions.length}
          onStart={handleStartExam}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <ExamTimer timeLeft={state.timeLeft} />

        <div className="space-y-8">
          {examQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              selectedAnswer={state.answers[question.id]}
              onAnswerSelect={handleAnswer}
            />
          ))}
        </div>

        <SubmitButton
          onSubmit={handleSubmit}
          isDisabled={Object.keys(state.answers).length !== examQuestions.length}
          totalQuestions={examQuestions.length}
          answeredQuestions={Object.keys(state.answers).length}
        />
      </div>
    </div>
  );
}