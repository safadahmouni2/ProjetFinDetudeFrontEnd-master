import {UsersModels} from "./Users.models";
import {RolesModels} from "./Roles.models";
import {CompetanceFilesModels} from "./Competance-files.models";


export class DemandeModule {
    public  id:number;
    public  duration:number;

    public  title:string;
    public  description:string ;
    public  link:string;
    public  start_date:Date;
    public  closing_date:Date;
    public  dateCreation:Date;

    public  visibility:boolean;
    public  enable:boolean;
    public competanceFiles: CompetanceFilesModels[];
    public users:UsersModels;

    public user:UsersModels[];
}
