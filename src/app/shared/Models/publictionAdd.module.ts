import {UsersModels} from "./Users.models";
export class PublictionAddModule{
    public  id:number;
    public  status:string;
    public  video:string ;
    public  image:string;
    public  start_date:Date;
    public  last_modif:Date;
    public  visibility:boolean;
    public users:UsersModels;

}
