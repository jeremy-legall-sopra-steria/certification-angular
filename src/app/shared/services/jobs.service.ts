import { computed, Injectable, Signal, signal } from '@angular/core';
import { Job, JobDetails } from '../models/job.model';
import { JobsHttpService } from './jobs.http.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(
    private readonly jobsHttpService: JobsHttpService,
    private readonly router: Router
  ) {
    // Fetch the jobs
    this.jobsHttpService.getJobs().subscribe((jobs: Job[]) => {
      this._jobs.set(jobs);
    });
  }

  private _jobs = signal<Job[] | null>(null);

  /**
   * Get the jobs
   */
  get jobs(): Signal<Job[] | null> {
    return this._jobs.asReadonly();
  }

  /**
   * Get a job by it's id
   */
  public getJobById(jobId: number): Observable<JobDetails> {
    return this.jobsHttpService.getJobById(jobId).pipe(
      catchError(() => {
        this.router.navigate(['/jobs']);
        return EMPTY;
      })
    );
  }

  /**
   * Get the favorite jobs
   */
  get favoriteJobs(): Signal<Job[]> {
    return computed(() => {
      const jobs = this._jobs();
      if (jobs === null) {
        return [];
      }
      return jobs.filter((job) => job.isFavorite);
    });
  }

  /**
   * Set a job as favorite
   * @param jobId The job id
   */
  public setJobAsFavorite(jobId: number): void {
    this._jobs.update((jobs) => {
      if (jobs == null) {
        return jobs;
      }
      return jobs.map((j) =>
        j.id === jobId ? { ...j, isFavorite: !j.isFavorite } : j
      );
    });
  }
}
