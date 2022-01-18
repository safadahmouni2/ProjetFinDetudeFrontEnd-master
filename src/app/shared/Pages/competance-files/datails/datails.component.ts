import { Component, OnInit } from '@angular/core';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {CompetanceFilesService} from '../../../Services/competance-files.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupsModels} from "../../../Models/Groups.models";
import {Location} from "@angular/common";

@Component({
  selector: 'app-datails',
  templateUrl: './datails.component.html',
  styleUrls: ['./datails.component.scss']
})
export class DatailsComponent implements OnInit {
    id: any;
    cv: CompetanceFilesModels;
cvv: CompetanceFilesModels;
    filteredFruits4: Observable<string[]>;
    constructor(private route: ActivatedRoute,private  competanceService: CompetanceFilesService,private router: Router ,
                private location: Location)
     { this.id = localStorage.getItem('id');
         }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.id = params['id'];
          this.getCVID();
         // this.group = new GroupsModels();
      });
      }
    getCVID() {
        this.competanceService.getAllCVID( this.id ).subscribe((reslt) => {
            this.cv = reslt;
            console.log(reslt);
        });

    }
    retour() {
        this.location.back();
    }

}
