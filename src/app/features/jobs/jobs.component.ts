import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JobsService } from '../../shared/services/jobs.service';
import { CommonModule } from '@angular/common';
import { ListJobsElementComponent } from '../../shared/components/list-job-element/list-jobs-element.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  standalone: true,
  imports: [CommonModule, ListJobsElementComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsComponent {
  constructor(private readonly jobsService: JobsService) {}
  public jobs = this.jobsService.jobs;

  /**
   * Set job as favorite
   * @param jobId job id
   */
  public setJobAsFavorite(jobId: number) {
    this.jobsService.setJobAsFavorite(jobId);
  }
}
