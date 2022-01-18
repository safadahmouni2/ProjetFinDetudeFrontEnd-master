import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {ActivatedRoute, Router} from '@angular/router';
import {CompetanceFilesService} from '../../../Services/competance-files.service';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
    encapsulation: ViewEncapsulation.None

})
export class EditComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    shortLink: string = '';
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
    form: FormGroup;
    file: File ;
    loading: boolean = false; // Flag variable

    @ViewChild('experiencesInput') experiencesInput: ElementRef<HTMLInputElement>;
    @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
    @ViewChild('languesInput') languesInput: ElementRef<HTMLInputElement>;
    @ViewChild('ecoleInput') ecoleInput: ElementRef<HTMLInputElement>;
    @ViewChild('posteInput') posteInput: ElementRef<HTMLInputElement>;

    id: any;
    competanceFiles: CompetanceFilesModels;
    constructor(private _formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,private competanceFilesService: CompetanceFilesService) {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
        this.form = this._formBuilder.group({
            name: [''],
            img: [null]});
    }


    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.getCVID();
            this.competanceFiles=new CompetanceFilesModels();


        });


       }
    getCVID() {
        this.competanceFilesService.getAllCVID( this.id ).subscribe((reslt) => {
            this.competanceFiles = reslt;
            console.log(reslt);
        });

    }
    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }
    editCV( ) {
        let add: any;
        this.competanceFilesService.updateCV(this.competanceFiles).subscribe((reslt) => {
            add = reslt;
            this.router.navigate(['/apps/CompetencesFiles/liste']);


        });
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
            const skills={name:value};

            this.competanceFiles.skills.push(skills);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.fruitCtrl.setValue(null);
    }
    addExp(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            const experience={title:value};

            this.competanceFiles.experiences.push(experience);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.fruitCtrl.setValue(null);
    }
    addLan(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            const langue={lang_name:value};

            this.competanceFiles.languages.push(langue);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.fruitCtrl.setValue(null);
    }
    addEcole(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            const ecole={name:value};

            this.competanceFiles.ecole.push(ecole);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.fruitCtrl.setValue(null);
    }
    addPoste(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
const poste={name:value};


this.competanceFiles.poste.push(poste);

            console.log(this.competanceFiles.poste.length,"####",this.competanceFiles.poste);

        }

        // Clear the input value
        event.chipInput?.clear();

        this.fruitCtrl.setValue(null);
    }

    removeSkill(fruit: string): void {
        const index = this.competanceFiles.skills.indexOf(fruit);

        if (index >= 0) {
            this.competanceFiles.skills[index].delete=true;
        }
    }
    removeExp(fruit: string): void {
        const index = this.competanceFiles.experiences.indexOf(fruit);

        if (index >= 0) {
            this.competanceFiles.experiences[index].delete=true;
        }
    }
    removeLan(fruit: string): void {
        const index = this.competanceFiles.languages.indexOf(fruit);

        if (index >= 0) {
            this.competanceFiles.languages[index].delete=true;
        }
    }
    removeEcole(fruit: string): void {
        const index = this.competanceFiles.ecole.indexOf(fruit);

        if (index >= 0) {
            this.competanceFiles.ecole[index].delete=true;
        }
    }
    removePoste(fruit: string): void {
        const index = this.competanceFiles.poste.indexOf(fruit);

        if (index >= 0) {
       //     this.competanceFiles.poste.splice(index, 1);
            this.competanceFiles.poste[index].delete=true;
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

}
