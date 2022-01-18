import {DemandeModule} from "./demande.module";
import {CompetanceFilesModels} from "./Competance-files.models";

export class PostuleModels {

  constructor(
    public id: number,
    public serviceRequest: DemandeModule,
    public competanceFiles: CompetanceFilesModels,
public selected:boolean
  ) {


  }
}

