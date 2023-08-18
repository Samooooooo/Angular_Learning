import { Question } from './question';

export interface Score {
  correct: number;
  wrong: number;
  skipped: number;
  remaining: number;
  wrongQuestions: Question[];
  skipedQuestions: Question[];
}
