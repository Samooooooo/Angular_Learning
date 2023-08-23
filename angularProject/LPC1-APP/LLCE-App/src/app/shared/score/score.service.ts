import { Injectable } from '@angular/core';
import { Question } from '../question';
import { Score } from '../score';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

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
  constructor(
    private router: Router,
    private service: QuestionService,
  ) {}

  updateScores(updatedScores: Score) {
    this.scores = updatedScores;
    console.table(this.scores);
  }

  isExamRoute(): boolean {
    const segments = this.router.url
      .split('/')
      .filter((segment) => segment !== ''); // Split URL segments

    if (segments.length >= 1 && segments[0] === 'exam') {
      return true; // Check if the first segment is 'exam'
    }
    return false;
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
        if (this.isExamRoute()) {
          updatedScores.wrongQuestions = updatedScores.wrongQuestions.filter(
            (q) => q.index !== question.index,
          );
        }
        updatedScores.skipedQuestions = updatedScores.skipedQuestions.filter(
          (q) => q.index !== question.index,
        );
        if (
          !this.scores.rightQuestions.some((q) => q.index === question.index)
        ) {
          updatedScores.rightQuestions.push(question);
        }
      } else if (question.skipped) {
        if (
          !this.scores.rightQuestions.some((q) => q.index === question.index) &&
          !this.scores.skipedQuestions.some((q) => q.index === question.index)
        ) {
          updatedScores.skipedQuestions.push(question);
        }
      } else {
        if (
          Array.isArray(answers) &&
          answers.length !== 0 &&
          !question.skipped
        ) {
          if (
            !this.scores.wrongQuestions.some(
              (wq) => wq.index === question.index,
            )
          ) {
            updatedScores.wrongQuestions.push(question);
          } else if (
            this.scores.wrongQuestions.findIndex(
              (wq) => wq.selectedAnswer === question.selectedAnswer,
            ) == -1
          ) {
            console.log('asddasdasfas');
            updatedScores.wrongQuestions.push(question);
          }
        }
      }
    } else {
      if (answers.includes(question.correctAnswer[0])) {
        updatedScores.rightQuestions.push(question);
        updatedScores.skipedQuestions = updatedScores.skipedQuestions.filter(
          (q) => q.index !== question.index,
        );
        if (this.isExamRoute()) {
          updatedScores.wrongQuestions = updatedScores.wrongQuestions.filter(
            (q) => q.index !== question.index,
          );
        }
      } else if (answers !== '') {
        if (
          this.scores.wrongQuestions.some((wq) => wq.index === question.index)
        )
          if (
            !this.scores.wrongQuestions.some((wq) =>
              wq.selectedAnswer.includes(answers),
            )
          ) {
            updatedScores.wrongQuestions.push(question);
            console.log('fillin');
          }
      }
    }
    updatedScores.answersCounter = updatedScores.rightQuestions.length;
    updatedScores.skipped = updatedScores.skipedQuestions.length;
    updatedScores.wrong = updatedScores.wrongQuestions.length;
    this.updateScores(updatedScores);
    if (
      this.service.questionsLength * 0.2 ===
      this.scores.wrongQuestions.length
    ) {
      this.router.navigate(['score']);
      console.log('finish');
    }
  }
}
