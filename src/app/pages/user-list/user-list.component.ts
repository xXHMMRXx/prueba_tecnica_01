import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Users } from '../../interfaces/users-service.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { TableComponent } from '../../shared/components/table/table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  title = 'prueba_tecnica';
  displayedColumns = ['position', 'name', 'username', 'email'];
  configTable = [
    {
      matColumnDef: 'position',
      matHeaderCellDef: 'No.',
      matCellDef: 'position',
    },
    {
      matColumnDef: 'name',
      matHeaderCellDef: 'Nombre',
      matCellDef: 'name',
    },
    {
      matColumnDef: 'username',
      matHeaderCellDef: 'Nombre de Usuario',
      matCellDef: 'username',
    },
    {
      matColumnDef: 'email',
      matHeaderCellDef: 'Correo Electronico',
      matCellDef: 'email',
    },
  ];
  dataSource: any[] = [];
  value = '';

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(
      (res: Users[]) => {
        this.dataSource = res.map((user: Users) => {
          user.position = user.id;
          return user;
        });
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  rowEvent({ data }: any) {
    this.router.navigate([`user-detail/${data.id}`]);
  }
}
