import { Component } from '@angular/core';
import { Score } from '../score';
import { ScoreService } from './score.service';

@Component({
  selector: 'lpc-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent {
  scores: Score;


  constructor(private scoreService: ScoreService) {
    this.scores = this.scoreService.getScores();
  }
}
