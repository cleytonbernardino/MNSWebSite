import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { companiesResolver } from './companies-resolver';

describe('companiesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => companiesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
