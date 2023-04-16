import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { User } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users-signal-page',
  templateUrl: './users-signal-page.component.html',
  styleUrls: ['./users-signal-page.component.css'],
})
export class UsersSignalPageComponent implements OnInit {
  public usersService = inject(UsersService);

  public users = signal<User[]>([]);
  public currentPage = signal(1);

  public labelTotalUser = computed(() => `Total de usuarios ${this.users().length}`);

  ngOnInit(): void {
    this.loadPage(this.currentPage());
  }

  async loadPage(page: number): Promise<void> {
    try {
      const users = await firstValueFrom(this.usersService.loadPage(page));

      if (users.length) {
        this.users.update((currentUsers) => currentUsers.concat(users));
        this.currentPage.set(page);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
