import { TestBed } from '@angular/core/testing';

import { DetalleOrdenService } from './detalle-orden.service';

describe('DetalleOrdenService', () => {
  let service: DetalleOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
