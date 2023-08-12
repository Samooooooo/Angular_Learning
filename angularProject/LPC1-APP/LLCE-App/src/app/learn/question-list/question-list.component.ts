import { Component, OnInit } from '@angular/core';
import { Question } from '../../shared/question';
import { QuestionService } from '../../shared/question.service';

@Component({
  selector: 'lpc-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];

  constructor(private Service: QuestionService) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.Service.getQuestions().subscribe(
      (questions) => {
        this.questions = questions;
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }
  showAnswer(question: Question) {
    question.showAnswer = true;
  }
}
