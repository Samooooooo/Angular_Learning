import { Injectable } from '@angular/core';
import { Question } from '../question';
import { Score } from '../score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private scores: Score = {
    wrong: 0,
    skipped: 0,
    remaining: 120,
    wrongQuestions: [],
    skipedQuestions: [],
    rightQuestions: [],
    answersCounter: 0,
  };

  getScores() {
    return this.scores;
  }

  updateScores(updatedScores: Score) {
    this.scores = updatedScores;
    console.table(updatedScores);
    console.table(this.scores);
  }

  calculateUpdatedScores(question: Question, answers: string | string[]) {
    const updatedScores = { ...this.scores };
    if (Array.isArray(answers)) {
      const correctAnswersFirstChars = question.correctAnswer.map((correct) =>
        correct.charAt(0)
      );
      const isCorrect = answers.every((answer) =>
        correctAnswersFirstChars.includes(answer.charAt(0))
      );
      if (isCorrect && answers.length === question.correctAnswer.length) {
        if (!this.scores.rightQuestions.some((q=>q.index === question.index))) {
          updatedScores.rightQuestions.push(question)
        }
        if (question.skipped) {
        } else {
          updatedScores.skipedQuestions = updatedScores.skipedQuestions.filter(
            (q) => q.index !== question.index
          );
        }
      } else {
        if (question.skipped && !this.scores.skipedQuestions.some((q) => q.index === question.index)) {
          updatedScores.skipedQuestions.push(question);
        } else if (Array.isArray(answers) && answers.length !== 0) {
          if (
            !this.scores.wrongQuestions.includes(question) &&
            !this.scores.wrongQuestions.some(
              (q) => q.selectedAnswer[0] === question.selectedAnswer[0]
            )
          ) {
            updatedScores.wrongQuestions.push(question);
          }
        }
      }
    } else {
      if (answers.includes(question.correctAnswer[0])) {
        updatedScores.skipedQuestions = updatedScores.skipedQuestions.filter(
          (q) => q.index !== question.index
        );
      } else {
        if (question.skipped && !updatedScores.skipedQuestions.includes(question)) {
          updatedScores.skipedQuestions.push(question);
        } else {
          updatedScores.wrongQuestions.push(question);
        }
      }
    }
    updatedScores.answersCounter = updatedScores.rightQuestions.length
    updatedScores.skipped = updatedScores.skipedQuestions.length
    updatedScores.wrong = updatedScores.wrongQuestions.length
    this.updateScores(updatedScores);
  }
}
