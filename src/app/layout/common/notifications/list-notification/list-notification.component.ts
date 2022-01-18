import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {Notification} from '../notifications.types';
import {tap} from 'rxjs/operators';
import {NotificationsService} from '../notifications.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss']
})
export class ListNotificationComponent implements OnInit {
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;
    token = localStorage.getItem('AuthToken');
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(this.token.toString());
    userData = { id: this.decodedToken.id,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        name_user: this.decodedToken.name_user,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        first_name: this.decodedToken.first_name,
        picture:this.decodedToken.picture,
        email: this.decodedToken.email,
        title: this.decodedToken.title,
        login: this.decodedToken.login,
        pwd: this.decodedToken.pwd,
        gender: this.decodedToken.gender,
        age: this.decodedToken.age,
        phone: this.decodedToken.phone,
        date_birth: this.decodedToken.date_birth,
        pays: this.decodedToken.pays,
    };
    private _overlayRef: OverlayRef;

    unreadCount: number = 0;
notification: Notification;
    notifications: Notification[];
    load=false;
  constructor( private notificationService: NotificationsService,
               private _changeDetectorRef: ChangeDetectorRef,
               private _overlay: Overlay,
               private _viewContainerRef: ViewContainerRef,
               private router: Router,
               private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
      this.listNotif();
  }

    //get all  number of notif for each user
    listNotif(){
        this.notificationService.listNotif(this.userData.id).subscribe((reslt) => {
            this.notifications = reslt;
            this.load=true;
        });
    }
    profilDetails(id){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        const x = this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});
        console.log('urllllllllllllll',x);
    }
    isRead(id) {
        let add: any;
        // eslint-disable-next-line eqeqeq

        this.notificationService.isReadNotif(id).subscribe((reslt) => {
            add = reslt;
            this.listNotif();
            this.closePanel();

        });
    }
    /**
     * Close the messages panel
     */
    closePanel(): void {
        this._overlayRef.detach();

    }
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
    /**
     * Create the overlay
     */
    private _createOverlay(): void {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                .withLockedPosition()
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top'
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom'
                    },
                    {
                        originX: 'end',
                        originY: 'bottom',
                        overlayX: 'end',
                        overlayY: 'top'
                    },
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'end',
                        overlayY: 'bottom'
                    }
                ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }
    /**
     * Open the notifications panel
     */
    openPanel(): void {
        // Return if the notifications panel or its origin is not defined
        if (!this._notificationsPanel || !this._notificationsOrigin) {
            return;
        }

        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

}
