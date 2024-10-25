import { SafeHtmlPipe } from './safeHtml.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SafeHtmlPipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: jasmine.createSpy(
              'bypassSecurityTrustHtml'
            ),
          },
        },
      ],
    });

    pipe = TestBed.inject(SafeHtmlPipe);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call bypassSecurityTrustHtml with the provided value', () => {
    const value = '<div>Test</div>';
    pipe.transform(value);
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(value);
  });
});
