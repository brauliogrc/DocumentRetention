import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpCreateDocComponent } from '../popUps/pop-up-create-doc/pop-up-create-doc.component';
import { AuthSericeService } from '@auth/autServices/auth-serice.service';
import { EncryptionAndDecryptionService } from '@shared/services/encryptionanddecryption/encryption-and-decryption.service';
import { DocsViewerComponent } from '@first-view/docs-viewer/docs-viewer.component';

@Component({
  selector: 'app-docs-creation',
  templateUrl: './docs-creation.component.html',
  styleUrls: ['./docs-creation.component.css']
})
export class DocsCreationComponent implements OnInit {
  @ViewChild(DocsViewerComponent) docViewer: DocsViewerComponent;

  public  isLogger: boolean = false;
  public userRole:  number

  constructor(
    private _dialog: MatDialog,
    private _auth: AuthSericeService,
    private _crypt: EncryptionAndDecryptionService,
  ) { }

  ngOnInit(): void {

    // TODO: 001-Agrupar la validación de logue o rol en un método del service Auth
    this._auth.isLogged.subscribe(
      (Logged) => {
        this.isLogger = Logged;
      }
    );

    this.userRole = this._crypt.userRole;
  }

  // Método quemuestra el PopUp para la creación de un nuevo documento
  public popUpDocumentRegister (): void {
    const dialogRef = this._dialog.open(PopUpCreateDocComponent, {panelClass: 'panel',width: '40%', height: '85%'});
    dialogRef.afterClosed().subscribe(
      (res) => {
        console.log(res);
        console.log('Llamado a recargar la página despues de crear un documento ');
        // Este método se ejecuta al momento de cerrar el pop up
        this.docViewer.refillTable();
      }
    );
  }
}