import { TestBed } from '@angular/core/testing';

import { GeneradorPdfService } from './generador-pdf.service';

describe('GeneradorPdfService', () => {
  let service: GeneradorPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneradorPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
