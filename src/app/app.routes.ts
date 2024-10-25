import { Routes } from '@angular/router';
import { JobsComponent } from './features/jobs/jobs.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { JobDetailsComponent } from './shared/components/job-details/job-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'jobs',
  },
  {
    path: 'jobs',
    pathMatch: 'full',
    component: JobsComponent,
  },
  {
    path: 'job/:id',
    pathMatch: 'full',
    component: JobDetailsComponent,
  },
  {
    path: 'favorites',
    pathMatch: 'full',
    component: FavoritesComponent,
  },
];
