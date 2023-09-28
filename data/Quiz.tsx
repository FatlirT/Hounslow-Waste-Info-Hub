export type Question = {
  question: string;
  answers: Answer[];
  id: string;
};

export type Answer = {
  answer: string;
  correct: boolean;
  id: string;
};

