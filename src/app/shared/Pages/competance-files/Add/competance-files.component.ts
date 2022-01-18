import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {ActivatedRoute, Router} from '@angular/router';
import {CompetanceFilesService} from '../../../Services/competance-files.service';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {errorObject} from 'rxjs/internal-compatibility';
import {MatChipInputEvent} from '@angular/material/chips';
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-competance-files',
  templateUrl: './competance-files.component.html',
    encapsulation: ViewEncapsulation.None

})
export class CompetanceFilesComponent implements OnInit {
     token = localStorage.getItem('AuthToken');
     helper = new JwtHelperService();
     decodedToken = this.helper.decodeToken(this.token.toString());
     userData = { userId: this.decodedToken.userId};

    formFieldHelpers: string[] = [''];

    selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  fruitCtrl2 = new FormControl();
  fruitCtrl3 = new FormControl();
  fruitCtrl4 = new FormControl();
  fruitCtrl1 = new FormControl();

  filteredFruits1: Observable<string[]>;
  filteredFruits2: Observable<string[]>;
  filteredFruits3: Observable<string[]>;
  filteredFruits4: Observable<string[]>;

  filteredFruits: Observable<string[]>;
  allFruits: string[] = [];
    alert: any;

    @ViewChild('supportNgForm') supportNgForm: NgForm;
  @ViewChild('experiencesInput') experiencesInput: ElementRef<HTMLInputElement>;
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('languesInput') languesInput: ElementRef<HTMLInputElement>;
  @ViewChild('ecoleInput') ecoleInput: ElementRef<HTMLInputElement>;
  @ViewChild('posteInput') posteInput: ElementRef<HTMLInputElement>;


  form: FormGroup;

  competanceFiles: CompetanceFilesModels;
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File ;


  constructor(private route: ActivatedRoute, private router: Router,
               private competanceFilesService: CompetanceFilesService,
              private _formBuilder: FormBuilder,private _snackBar: MatSnackBar) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    this.form = this._formBuilder.group({
      name: [''],
      img: [null]});
  }

  ngOnInit(): void {
    this.competanceFiles=new CompetanceFilesModels();



  }
    openSnackBar() {
        this._snackBar.open('Votre CV est ajouté ! ', 'Ok');
    }
  onChange(event: any) {this.file = event.target.files[0];}
  onUpload() {

    //let add: any;

    this.loading = !this.loading;
    this.competanceFilesService.upload(this.file).subscribe(
      (resultttt) => {
        this.competanceFiles = resultttt;
       // this.f1.nom = resultttt.name;

      });

  }

  submitForm() {
    console.log(this.form.value);
  }
  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.competanceFiles.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }
  addExp(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.competanceFiles.experiences.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }
  addLan(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.competanceFiles.languages.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }
  addEcole(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.competanceFiles.ecole.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }
  addPoste(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.competanceFiles.poste.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  removeSkill(fruit: string): void {
    const index = this.competanceFiles.skills.indexOf(fruit);

    if (index >= 0) {
      this.competanceFiles.skills.splice(index, 1);
    }
  }
  removeExp(fruit: string): void {
    const index = this.competanceFiles.experiences.indexOf(fruit);

    if (index >= 0) {
      this.competanceFiles.experiences.splice(index, 1);
    }
  }
  removeLan(fruit: string): void {
    const index = this.competanceFiles.languages.indexOf(fruit);

    if (index >= 0) {
      this.competanceFiles.languages.splice(index, 1);
    }
  }
  removeEcole(fruit: string): void {
    const index = this.competanceFiles.ecole.indexOf(fruit);

    if (index >= 0) {
      this.competanceFiles.ecole.splice(index, 1);
    }
  }
  removePoste(fruit: string): void {
    const index = this.competanceFiles.poste.indexOf(fruit);

    if (index >= 0) {
      this.competanceFiles.poste.splice(index, 1);
    }
  }

  selectedSkill(event: MatAutocompleteSelectedEvent): void {
    this.competanceFiles.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.fruitCtrl4.setValue(null);
  }
  selectedExp(event: MatAutocompleteSelectedEvent): void {
    this.competanceFiles.experiences.push(event.option.viewValue);
    this.experiencesInput.nativeElement.value = '';
    this.fruitCtrl3.setValue(null);
  }
  selectedLan(event: MatAutocompleteSelectedEvent): void {
    this.competanceFiles.languages.push(event.option.viewValue);
    this.languesInput.nativeElement.value = '';
    this.fruitCtrl2.setValue(null);
  }
  selectedEcole(event: MatAutocompleteSelectedEvent): void {
    this.competanceFiles.ecole.push(event.option.viewValue);
    this.ecoleInput.nativeElement.value = '';
    this.fruitCtrl1.setValue(null);
  }
  selectedPoste(event: MatAutocompleteSelectedEvent): void {
    this.competanceFiles.poste.push(event.option.viewValue);
    this.posteInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

    // eslint-disable-next-line @typescript-eslint/member-ordering,@typescript-eslint/explicit-function-return-type
  addCV( ) {
    let add: any;
      const token = localStorage.getItem('AuthToken');
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token.toString());
      const userData = {email: decodedToken.email, userId: decodedToken.userId};

       let competanceFilesCopie = Object.assign({}, this.competanceFiles);

      competanceFilesCopie.users={ id: decodedToken.id,name_user: decodedToken.name_user,first_name: decodedToken.first_name,
          email: decodedToken.email,
          title: decodedToken.title,login: decodedToken.login,pwd: decodedToken.pwd,
          gender: decodedToken.gender,age: decodedToken.age,phone: decodedToken.phone,
          date_birth: decodedToken.date_birth,
          description: decodedToken.description,
          pays:decodedToken.pays,
          etat: decodedToken.etat,picture: decodedToken.picture};
    this.competanceFilesService.addDossier(competanceFilesCopie).subscribe((reslt) => {
      add = reslt;
        this.router.navigate(['/apps/offre']);
    });}
    // eslint-disable-next-line @typescript-eslint/member-ordering
    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }

    clearForm(): void
    {
        // Reset the form
        this.supportNgForm.resetForm();
    }

}
