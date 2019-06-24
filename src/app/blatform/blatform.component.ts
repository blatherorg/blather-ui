import { Router } from '@angular/router';
import { BlatformService } from './blatform.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blatform',
  templateUrl: './blatform.component.html',
  styleUrls: ['./blatform.component.scss']
})
export class BlatformComponent implements OnInit {

  
  public blatText: string = '';
  public blatUser: string = '';
  constructor(private blatformService: BlatformService, private router: Router) { }

  ngOnInit() {
  }

  public sendBlat() {
    this.blatformService.sendBlat(this.blatText, this.blatUser).subscribe(() => {
      // successful blat post
      this.router.navigate(['/feed']);
    }, () => {
      // unsuccessful blat post
    });
  }
}
