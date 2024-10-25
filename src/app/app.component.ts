import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobsService } from './shared/services/jobs.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  providers: [JobsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-job-search';
}
