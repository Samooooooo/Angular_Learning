import { Injectable } from '@angular/core';
import { Question } from '../question';
import { Score } from '../score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private scores: Score = {
    correct: 0,
    wrong: 0,
    skipped: 0,
    remaining: 120,
    wrongQuestions: [],
    skipedQuestions: [],
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
        correct.charAt(0),
      );
      const isCorrect = answers.every((answer) =>
        correctAnswersFirstChars.includes(answer.charAt(0)),
      );
      if (isCorrect && answers.length === question.correctAnswer.length) {
        updatedScores.correct++;
        updatedScores.remaining--;
      } else {
        if (question.skipped) {
          if (!updatedScores.skipedQuestions.includes(question)) {
            updatedScores.skipped++;
            updatedScores.skipedQuestions.push(question);
          }
        } else {
          if (Array.isArray(answers) && answers.length !== 0) {
            updatedScores.wrong++;
            updatedScores.wrongQuestions.push(question);
          }
        }
      }
    } else {
      //Fill IN
      if (answers.includes(question.correctAnswer[0])) {
        updatedScores.correct++;
        updatedScores.remaining--;
      } else {
        if (question.skipped) {
          if (!updatedScores.skipedQuestions.includes(question)) {
            updatedScores.skipped++;
            updatedScores.skipedQuestions.push(question);
          }
        } else {
          updatedScores.wrong++;
          updatedScores.wrongQuestions.push(question);
        }
      }
    }
    this.updateScores(updatedScores);
  }
}
