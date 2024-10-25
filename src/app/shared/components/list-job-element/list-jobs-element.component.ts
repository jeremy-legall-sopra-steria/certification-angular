import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Job } from '../../models/job.model';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-jobs-element',
  templateUrl: './list-jobs-element.component.html',
  styleUrls: ['./list-jobs-element.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
})
export class ListJobsElementComponent {
  @Input({ required: true }) job!: Job;
  @Input({ required: true }) showStar!: boolean;
  @Output() jobIdFavoriteEvt = new EventEmitter<number>();
  constructor(private readonly router: Router) {}

  /**
   * Set job as favorite
   * @param jobId job id
   */
  public setJobAsFavorite(jobId: number) {
    this.jobIdFavoriteEvt.emit(jobId);
  }

  /**
   * Navigate to job details
   * @param jobId job id
   */
  public navigateToDetails(jobId: number): void {
    this.router.navigate(['/job', jobId]);
  }
}
