import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from '../../shared/question';
import { QuestionService } from '../../shared/question.service';

@Component({
  selector: 'lpc-check-question-details',
  templateUrl: './check-q-details.component.html',
  styleUrls: ['./check-q-details.component.css'],
})
export class CheckQDetailsComponent {
  question$: Observable<Question>;
  wrongAnswers: number = 0;
  showResult: boolean = false;
  correctAnswers: number = 0;
  skippedQuestions: number = 0;

  constructor(
    private service: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.question$ = this.service.getSingle('0');
  }

  checkAnswer(question: Question, selectedAnswer: string | string[]) {
    const answerArray = Array.isArray(selectedAnswer)
      ? selectedAnswer
      : [selectedAnswer];

    if (
      question.correctAnswer.length === answerArray.length &&
      answerArray.every((a) => question.correctAnswer.includes(a))
    ) {
      this.correctAnswers++;
    } else {
      this.wrongAnswers++;
    }

    this.showNextOrResult();
  }

  showNextOrResult() {
    this.question$.subscribe((q) => {
      if (!q) {
        this.showResult = true;
        if (this.wrongAnswers >= 8) {
          this.router.navigate(['/check/finished'], {
            state: {
              correctAnswers: this.correctAnswers,
              wrongAnswers: this.wrongAnswers,
              skippedQuestions: this.skippedQuestions,
            },
          });
        }
      }
    });
  }

  skipQuestion() {
    this.skippedQuestions++;
    this.showNextOrResult();
  }

  nextQuestion() {
    this.question$.subscribe((q) => {
      if (q) {
        const nextIndex = (parseInt(q.index) + 1).toString();
        this.question$ = this.service.getSingle(nextIndex);
      }
    });
  }

  previousQuestion() {
    this.question$.subscribe((q) => {
      if (q) {
        const prevIndex = (parseInt(q.index) - 1).toString();
        this.router.navigate(['check', prevIndex]);
      }
    });
  }
}
