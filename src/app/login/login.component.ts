import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showTabIndex: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      console.log('data.page: ' + data.page);
      this.showTabIndex = data.page === 'register' ? 1 : 0;
      console.log('this.showTabIndex: ' + this.showTabIndex);
    });
  }

  public tabChange(index: number): void {
    this.router.navigate([index === 0 ? '/login' : '/register']);
  }
}
