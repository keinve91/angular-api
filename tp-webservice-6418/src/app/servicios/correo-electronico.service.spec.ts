import { TestBed } from '@angular/core/testing';

import { CorreoElectronicoService } from './correo-electronico.service';

describe('CorreoElectronicoService', () => {
  let service: CorreoElectronicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreoElectronicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
