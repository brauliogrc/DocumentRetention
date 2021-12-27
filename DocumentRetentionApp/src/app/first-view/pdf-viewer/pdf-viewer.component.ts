import { Component, OnInit } from '@angular/core';
import { ConnectShowPdfService } from '@shared/services/connectshowresultpdfviewer/connect-show-pdf.service';
import { Location } from '@angular/common'

import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { AuthSericeService } from '../../auth/autServices/auth-serice.service';
import { EncryptionAndDecryptionService } from '../../shared/services/encryptionanddecryption/encryption-and-decryption.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  // public archivo = 'assets/ipv6.pdf';
  public archivo             = '';
  public fileName:    string = '';
  private _fullName:  string;
  private _extension: string = '.pdf'
  private _path:      string = 'assets/Docs/';

  public isLogged: boolean   = false;
  public userRole: number;

  constructor(
    private _location: Location,
    private _auth: AuthSericeService,
    private _connShowPdf: ConnectShowPdfService,
    private _crypt: EncryptionAndDecryptionService
  ) { }

  ngOnInit(): void {
    // Colocamos la extención al nombre del archivo
    this.fileName  =  this._connShowPdf.getFileName;
    this._fullName = this._connShowPdf.getFileName + this._extension;
    // Concatenamos el nombre completo del archivo con la ruta en la carpeta "assets"
    this.archivo = this._path + this._fullName;

    // Obtención de valores necesarios para hacer visible el botón de descarga del documento
    // Esto se valida en el *ngIf del botón "download"
    // this._auth.isLogged.subscribe(
    //   (logged) => {
    //     this.isLogged = logged;
    //   }
    // );
    // this.userRole = this._crypt.userRole;
    // console.log('valor en al visor pdf', this.isLogged);

    // FIXME: Método sijeto a pruebas aún
    // Validación del rol para el acceso a esta sección
    let { isLoged, role } = this._auth.permision();
    this.userRole = role;
    this.isLogged = isLoged;
  }

  // Regreso a la página anterior
  public backLastPage(): void {
    this._location.back();
  }

  // public shDoc( docName: string ): void {
  //   console.log(docName);
    
  //   this.archivo = this._path + docName;
  // }

}
