import {Component, NgIterable, OnInit} from '@angular/core';
import {CompetanceFilesService} from '../../../Services/competance-files.service';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {ActivatedRoute, Router} from '@angular/router';
import {EditGComponent} from '../../groups/edit/edit.component';
import {Location} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {PostuleModels} from '../../../Models/Postule.models';

@Component({
  selector: 'app-list',
  templateUrl: './Malist.component.html',
  styleUrls: ['./list.component.scss']
})
export class MalistComponent implements OnInit {
    competanceF: Array<CompetanceFilesModels>;
    //competanceF: Array<any>;
    cv: CompetanceFilesModels;
id: any;
IDDelete: any;
    n=0;
    s=10;
  constructor(private sanitizer: DomSanitizer,private location: Location,private competanceFilesService: CompetanceFilesService,private router: Router,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.id = params['id'];

          this.getCV();
      });
  }
//, U extends NgIterable<T> = NgIterable<T>
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getCV() {
        const list = [];

        this.competanceFilesService.getMine(this.id).subscribe((reslt) => {
            this.competanceF = reslt;

        });
    }

    ondetaille(id){
        {

            this.router.navigate(['/apps/CompetencesFiles/details'],{queryParams:{'id':id}});

            console.log(id);

        }
    }

    option(id){
        localStorage.setItem('id', id);
        this.router.navigate(['/apps/CompetencesFiles/affectation']);
    }
    update(id){
        this.router.navigate(['/apps/CompetencesFiles/edit'],{queryParams:{'id':id}});
    }
    selectToDelete(id){
      this.IDDelete=id;
    }
    onDelete(id) {

        let res: any;
        this.competanceFilesService.deleteContact(id).subscribe((resltfe) => {
            res = resltfe;
this.getCV();


        });
        //localStorage.clear();
    }
    retour() {
        this.location.back();
    }
    Reffuse(id ) {
        let add: any;
        this.competanceFilesService.Reffuse(id).subscribe((reslt) => {
            add = reslt;

            this.getCV();

        });
    }
    Accept(id ) {
        let add: any;
        this.competanceFilesService.Accept(id).subscribe((reslt) => {
            add = reslt;

            this.getCV();

        });
    }
}
