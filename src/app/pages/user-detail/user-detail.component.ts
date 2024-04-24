import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../../interfaces/users-service.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CardComponent, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: number;
  userDetail: any;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.userId = Number(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.getUser();
  }

  back(): void {
    this.router.navigate(['']);
  }

  getUser(): void {
    this.usersService.getUsersById(this.userId).subscribe((res: Users) => {
      this.userDetail = res;
    });
  }
}
