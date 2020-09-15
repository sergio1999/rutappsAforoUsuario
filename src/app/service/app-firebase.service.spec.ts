import { TestBed } from '@angular/core/testing';

import { AppFirebaseService } from './app-firebase.service';

describe('AppFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppFirebaseService = TestBed.get(AppFirebaseService);
    expect(service).toBeTruthy();
  });
});
