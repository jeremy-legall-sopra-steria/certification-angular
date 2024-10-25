import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JobsService } from '../../shared/services/jobs.service';
import { CommonModule } from '@angular/common';
import { ListJobsElementComponent } from '../../shared/components/list-job-element/list-jobs-element.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ListJobsElementComponent],
})
export class FavoritesComponent {
  constructor(private readonly jobsService: JobsService) {}
  public jobs = this.jobsService.favoriteJobs;
}
