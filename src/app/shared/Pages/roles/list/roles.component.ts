import { Component, OnInit } from '@angular/core';
import {Task} from '../../../../modules/admin/apps/tasks/tasks.types';
import {RolesModels} from '../../../Models/Roles.models';
import {UsersService} from "../../../Services/users.service";
import {RolesService} from "../../../Services/roles.service";
import {UsersModels} from "../../../Models/Users.models";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
    drawerMode: 'side' | 'over';
    tasksCount: any = {
        completed : 0,
        incomplete: 0,
        total     : 0
    };
    RoleM: RolesModels;
    roles: Array<RolesModels>;
id:any;
    constructor(private roleService: RolesService) { }

  ngOnInit(): void {
        this.getRoles();
        this.getRolesID();
  }
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    getRoles() {

        this.roleService.getAllRole().subscribe((reslt) => {
            this.roles = reslt;

        });
    }
    Desactiver(id ) {
        let add: any;
        this.roleService.Bloque(id).subscribe((reslt) => {
            add = reslt;

            this.getRoles();

        });
    }
    Active(id ) {
        let add: any;
        this.roleService.Active(id).subscribe((reslt) => {
            add = reslt;
console.log(id);
            console.log(reslt);

            this.getRoles();

        });
    }
    change(id) {
        let add: any;
        // eslint-disable-next-line eqeqeq

            this.roleService.Change(id).subscribe((reslt) => {
                add = reslt;
                this.getRoles();

            });

        }

    getRolesID() {
        this.roleService.getRoleID( this.id ).subscribe((reslt) => {
            this.RoleM = reslt;
            console.log(reslt);
        });

    }
}
