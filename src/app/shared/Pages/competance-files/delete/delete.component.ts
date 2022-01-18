import { Component, OnInit } from '@angular/core';
import {CompetanceFilesService} from "../../../Services/competance-files.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
id:any
  constructor(private competanceFilesService: CompetanceFilesService) {
  }

  ngOnInit(): void {
  }

}
