import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PublictionModule} from "../../../../shared/Models/publiction.module";
import {PublicationsService} from "../../../../shared/Services/publications.service";
import {Router} from "@angular/router";
import {result} from "lodash-es";

@Component({
    selector       : 'profile',
    templateUrl    : './profile.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit
{
    pubL: Array<PublictionModule>;
    pub:PublictionModule;
    n:any;
    s:any;
    constructor(private publicationsService: PublicationsService,private router: Router) { }

    ngOnInit(): void {

    }


}
