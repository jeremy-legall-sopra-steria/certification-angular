import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job, JobDetails } from '../models/job.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsHttpService {
  constructor(private readonly httpClientJob: HttpClient) {}

  public getJobs(): Observable<Job[]> {
    return this.httpClientJob
      .get<Job[]>('/jobs')
      .pipe(
        map((jobs: Job[]) => jobs.map((job) => ({ ...job, isFavorite: false })))
      );
  }

  public getJobById(jobId: number): Observable<JobDetails> {
    return this.httpClientJob.get<JobDetails>(`/jobs/${jobId}`);
  }
}
