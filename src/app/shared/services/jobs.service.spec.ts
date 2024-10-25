import { TestBed } from '@angular/core/testing';
import { JobsService } from './jobs.service';
import { JobsHttpService } from './jobs.http.service';
import { of } from 'rxjs';
import { Job } from '../models/job.model';

describe('JobsService', () => {
  let service: JobsService;
  let jobsHttpServiceSpy: jasmine.SpyObj<JobsHttpService>;
  const mockJobs: Job[] = [
    {
      id: 1,
      title: 'Job 1',
      isFavorite: false,
      companyName: 'Company A',
      companyLogo: 'logo1.png',
      reference: 'Ref1',
    },
    {
      id: 2,
      title: 'Job 2',
      isFavorite: false,
      companyName: 'Company B',
      companyLogo: 'logo2.png',
      reference: 'Ref2',
    },
    {
      id: 3,
      title: 'Job 3',
      isFavorite: false,
      companyName: 'Company C',
      companyLogo: 'logo3.png',
      reference: 'Ref3',
    },
  ];

  beforeEach(() => {
    jobsHttpServiceSpy = jasmine.createSpyObj('JobsHttpService', [
      'getJobs',
      'getJobById',
    ]);
    jobsHttpServiceSpy.getJobs.and.returnValue(of(mockJobs));

    TestBed.configureTestingModule({
      providers: [
        JobsService,
        { provide: JobsHttpService, useValue: jobsHttpServiceSpy },
      ],
    });

    service = TestBed.inject(JobsService);
  });

  it('should return favorite jobs', (done) => {
    service.setJobAsFavorite(1);
    service.setJobAsFavorite(3);
    const favoriteJobs = service.favoriteJobs();
    expect(favoriteJobs.length).toBe(2);
    expect(favoriteJobs).toEqual([
      {
        id: 1,
        title: 'Job 1',
        isFavorite: true,
        companyName: 'Company A',
        companyLogo: 'logo1.png',
        reference: 'Ref1',
      },
      {
        id: 3,
        title: 'Job 3',
        isFavorite: true,
        companyName: 'Company C',
        companyLogo: 'logo3.png',
        reference: 'Ref3',
      },
    ]);
    done();
  });

  it('should return an empty array if no jobs are set to favorite', (done) => {
    const favoriteJobs = service.favoriteJobs();
    expect(favoriteJobs.length).toBe(0);
    expect(favoriteJobs).toEqual([]);
    done();
  });
});
