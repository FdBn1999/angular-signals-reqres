import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/users';
import { firstValueFrom } from 'rxjs';

@Component({
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  public users: User[] = [];
  public currentPage = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  async loadPage(currentPage: number): Promise<void> {
    try {
      const users = await firstValueFrom(this.usersService.loadPage(currentPage));
      if (users.length) {
        this.users = users;
        this.currentPage = currentPage;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
