import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { UsersService } from './users.service';
import { environment } from '../../../environments/environments';
import { Users } from '../../interfaces/users-service.interface';

describe('UsersService', () => {
  let service: UsersService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsersById', () => {
    it('should return a single user by ID', () => {
      const dummyUser: any = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };
      const userId = 1;

      service.getUsersById(userId).subscribe((user) => {
        expect(user).toEqual(dummyUser);
      });

      const req = httpTestingController.expectOne(
        `${environment.API_DOMAIN}/users/${userId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyUser);
    });
  });

  describe('getUsers', () => {
    it('should return an array of users', () => {
      const dummyUsers: any[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];

      service.getUsers().subscribe((users) => {
        expect(users).toEqual(dummyUsers);
      });

      const req = httpTestingController.expectOne(
        `${environment.API_DOMAIN}/users`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  });
});
