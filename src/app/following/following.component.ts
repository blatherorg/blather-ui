import { Component, OnInit } from '@angular/core';
import { FollowingService } from './following.service';
import { FollowingUser } from '../types/user';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  public usersIFollow: FollowingUser[];

  constructor(private followingService : FollowingService) { }

  ngOnInit() {
    this.getFollowed();
  }

  public getFollowed(): void {
    this.followingService.getFollowed("userIdDummy").subscribe((usersIFollow : FollowingUser[]) => {
      this.usersIFollow = usersIFollow;
    }, () => {
      console.error("failed getting follow-ees");
      this.usersIFollow = [
        {
          'email' : 'don.stryker@veritas.com',
          'handle' : 'TheDon'
        },
        {
          'email' : 'john.lundeen@veritas.com',
          'handle' : 'TheJohn'
        },
      ];
    });
  }
}

