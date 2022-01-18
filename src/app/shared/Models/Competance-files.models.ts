import {UsersModels} from "./Users.models";
import {JwtHelperService} from "@auth0/angular-jwt";

export class CompetanceFilesModels {

    public id: number;
    public name: string;
    public date: Date;
    public ecole: any[]=[];
    public poste: any[]=[];
    public mail: string;
    public phone: string;
    public experiences: any[]=[];
    public skills: any[]=[];
    public languages: any[]=[];
public users: UsersModels;
public selected:boolean;

}

