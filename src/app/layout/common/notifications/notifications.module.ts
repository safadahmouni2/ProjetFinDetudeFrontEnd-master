import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { SharedModule } from 'app/shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FuseCardModule} from '../../../../@fuse/components/card';
import { ListNotificationComponent } from './list-notification/list-notification.component';

@NgModule({
    declarations: [
        NotificationsComponent,
        ListNotificationComponent
    ],
    imports: [
        RouterModule,
        OverlayModule,
        PortalModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        SharedModule,
        MatProgressSpinnerModule,
        FuseCardModule
    ],
    exports     : [
        NotificationsComponent
    ]
})
export class NotificationsModule
{
}
