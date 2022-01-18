import { Component, OnInit } from '@angular/core';
import {Subject, timer} from "rxjs";
import {Router} from "@angular/router";
import {finalize, takeUntil, takeWhile, tap} from "rxjs/operators";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    countdown: number = 5;
    countdownMapping: any = {
        '=1'   : '# second',
        'other': '# seconds'
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor( private _router: Router) { }

  ngOnInit(): void {
      this.signOut();

      // Redirect after the countdown
      timer(1000, 1000)
          .pipe(
              finalize(() => {
                  this._router.navigate(['sign-in']);
              }),
              takeWhile(() => this.countdown > 0),
              takeUntil(this._unsubscribeAll),
              tap(() => this.countdown--),

          )
          .subscribe();

  }
    signOut(): void
    {
        // Remove the access token from the local storage
        localStorage.removeItem('AuthToken');
       // window.location.reload();

        // Set the authenticated flag to false
        //this._authenticated = false;

        // Return the observable
        //return true;
    }
}
