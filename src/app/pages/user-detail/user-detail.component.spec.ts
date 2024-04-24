import { TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserDetailComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
