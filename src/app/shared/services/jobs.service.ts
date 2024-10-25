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
      const favoritesJobsIds = this.getLocalStorageFavoritesJobsIds();
      jobs.forEach((job) => {
        job.isFavorite = favoritesJobsIds.includes(job.id);
      });
      console.log(favoritesJobsIds);
      this._jobs.set(jobs);
    });
  }

  private readonly _jobs = signal<Job[] | null>(null);

  /**
   * Get the jobs
   */
  get jobs(): Signal<Job[] | null> {
    return this._jobs.asReadonly();
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
    const ids = this.favoriteJobs().map((job) => job.id);
    // Save the favorite jobs ids in the local storage
    localStorage.setItem('favoritesJobsIds', JSON.stringify(ids));
  }

  /**
   * Get the favorite jobs ids from the local storage
   * @returns The favorite jobs ids from the local storage
   */
  private getLocalStorageFavoritesJobsIds(): number[] {
    const favoritesJobsIds = localStorage.getItem('favoritesJobsIds');
    if (favoritesJobsIds === null) {
      return [];
    }
    return JSON.parse(favoritesJobsIds);
  }
}
