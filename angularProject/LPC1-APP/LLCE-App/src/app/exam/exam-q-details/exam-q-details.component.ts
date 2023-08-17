import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/shared/question';
import { QuestionService } from 'src/app/shared/question.service';

@Component({
  selector: 'lpc-exam-q-details',
  templateUrl: './exam-q-details.component.html',
  styleUrls: ['./exam-q-details.component.css'],
})
export class ExamQDetailsComponent {
  question$: Observable<Question>;
  questions$: Observable<Question[]>;
  lastQError = 'No more Questions';
  lastQswitch = false;
  selectedAnswer: string[] = [];
  constructor(
    private service: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = this.route.snapshot.paramMap.get('index')!;
    this.question$ = this.service.getSingle(index);
    this.router.navigate(['exam', '0']);
    this.questions$ = this.service.getQuestions();
  }

  checkAnswerAndNavigate(question: Question, answers: string | string[]) {
    if (Array.isArray(answers)) {
      const correctAnswersFirstChars = question.correctAnswer.map((correct) =>
        correct.charAt(0),
      );
      const isCorrect = answers.every((answer) =>
        correctAnswersFirstChars.includes(answer.charAt(0)),
      );
      if (isCorrect) {
        this.showNextQuestion(question);
      } else {
        this.showPreviosQuestion(question);
      }
    } else {
      //For Fill IN
      if (answers.includes(question.correctAnswer[0])) {
        this.showNextQuestion(question);
      } else {
        this.showPreviosQuestion(question);
      }
    }
    this.selectedAnswer = [];
  }

  showNextQuestion(question: Question) {
    const nextIndex = (parseInt(question.index) + 1).toString();

    this.questions$.subscribe((questions) => {
      if (parseInt(nextIndex) < questions.length) {
        this.lastQswitch = false;
        this.question$ = this.service.getSingle(nextIndex);
        this.router.navigate(['exam', nextIndex]);
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
      this.router.navigate(['exam', prevIndex]);
    } else {
      this.lastQswitch = true;
    }
  }
  packInArray(option: string) {
    if (this.selectedAnswer.includes(option)) {
      this.selectedAnswer = this.selectedAnswer.filter(
        (item) => item !== option,
      );
    } else {
      this.selectedAnswer.push(option);
    }
  }
}
