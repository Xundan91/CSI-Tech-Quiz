// types.ts
export interface Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: string;
    userAnswer?: string;
    roundType: RoundType;
    testRoundId: number;
  }

  enum RoundType {
        APTITUDE,
        DSA_BASIC,
        DSA_ADVANCED
    }