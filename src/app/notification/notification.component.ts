import { Component, OnInit, Inject } from '@angular/core';
import { Notification } from '../types/notification';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  host: {
    '[class.notification-wrapper]': 'true'
  }
})
export class NotificationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notification) { }

  ngOnInit() {
  }

}
