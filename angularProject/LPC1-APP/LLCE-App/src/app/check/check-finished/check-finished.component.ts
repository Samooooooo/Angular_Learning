import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finished',
  templateUrl: './check-finished.component.html',
  styleUrls: ['./check-finished.component.css'],
})
export class FinishedComponent implements OnInit {
  correctAnswers: number = 0; // Initialize with default values
  wrongAnswers: number = 0;
  skippedQuestions: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const state = window.history.state;
    if (state) {
      this.correctAnswers = state.correctAnswers;
      this.wrongAnswers = state.wrongAnswers;
      this.skippedQuestions = state.skippedQuestions;
    }
  }
}
