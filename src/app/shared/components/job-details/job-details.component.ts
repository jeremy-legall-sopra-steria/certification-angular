import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { JobDetails } from '../../models/job.model';
import { SafeHtmlPipe } from '../../pipes/safeHtml.pipe';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SafeHtmlPipe, RouterLink],
})
export class JobDetailsComponent implements OnInit {
  @Input() id!: number;
  constructor(
    private readonly jobsService: JobsService,
    private readonly router: Router
  ) {}
  public job$!: Observable<JobDetails>;
  ngOnInit() {
    this.job$ = this.jobsService.getJobById(this.id);
  }
}
