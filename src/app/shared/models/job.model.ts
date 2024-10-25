export interface JobDetails {
  id: number;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;
  location: string;
  industries: string[];
  types: string[];
  description: string;
  publishDate: string;
}

export interface Job extends Omit<JobDetails, keyof JobDetails> {
  id: number;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;
  isFavorite: boolean;
}