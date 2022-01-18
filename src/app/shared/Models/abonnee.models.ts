import {UsersModels} from './Users.models';
import {NotificationsModule} from '../../layout/common/notifications/notifications.module';
import {Notification} from '../../layout/common/notifications/notifications.types';

export class AbonneeModels {
    public id: number;
    public id_prestataire: number;
    public  id_abonnee: number;
    public users: UsersModels;
    public notification: Notification;

    public etat: boolean;
    isDisabled: false;
}
