
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/shared/question';
import { QuestionService } from 'src/app/shared/question.service';

@Component({
  selector: 'lpc-check-q-details',
  templateUrl: './check-q-details.component.html',
  styleUrls: ['./check-q-details.component.css'],
})
export class CheckQDetailsComponent {
  question$: Observable<Question>;
  questions$: Observable<Question[]>;
  lastQError = 'No more Questions';
  lastQswitch = false;
  selectedAnswer: string | string[] = [];
  constructor(
    private service: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = this.route.snapshot.paramMap.get('index')!;
    this.question$ = this.service.getSingle(index);
    this.router.navigate(['check', '0']);
    this.questions$ = this.service.getQuestions();
  }

  checkAnswerAndNavigate(question: Question, answer: string | string[]) {
    console.log(answer);
    if (Array.isArray(answer)) {
      const correctAnswers = question.correctAnswer;
      const isCorrect = correctAnswers.every((correct) =>
        answer.includes(correct),
      );
      if (isCorrect) {
        this.showNextQuestion(question);
        console.log(answer);
        console.log('right');
      } else {
        this.showPreviosQuestion(question);
        console.log(answer);
        console.log('wrong');
      }
    } else {
      if (answer.includes(question.correctAnswer[0])) {
        this.showNextQuestion(question);
      } else {
        this.showPreviosQuestion(question);
      }
    }
    this.question$.subscribe(() => {
      this.selectedAnswer = '';
    });
  }

  showNextQuestion(question: Question) {
    const nextIndex = (parseInt(question.index) + 1).toString();

    this.questions$.subscribe((questions) => {
      if (parseInt(nextIndex) < questions.length) {
        this.lastQswitch = false;
        this.question$ = this.service.getSingle(nextIndex);
        this.router.navigate(['check', nextIndex]);
      } else {
        this.lastQswitch = true;
      }
    });
  }

  showPreviosQuestion(question: Question) {
    const prevIndex = (parseInt(question.index) - 1).toString();

    if (parseInt(prevIndex) >= 0) {
      this.lastQswitch = false;
      this.question$ = this.service.getSingle(prevIndex);
      this.router.navigate(['check', prevIndex]);
    } else {
      this.lastQswitch = true;
    }
  }
}
