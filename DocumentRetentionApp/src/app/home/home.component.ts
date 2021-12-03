import { Component, OnInit } from '@angular/core';

// Importaciones de "Primeng"
import { MenuItem } from 'primeng/api';

// Importación de servicios
import { AuthSericeService } from '@auth/autServices/auth-serice.service'
import { EncryptionAndDecryptionService } from '@app/shared/services/encryptionanddecryption/encryption-and-decryption.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public sidebar01:   boolean = false;
  public userName:    string = '***';
  public menuItems:   MenuItem[];

  private _isLogged:   boolean = false;
  private _userRole:   number;
  constructor(
    private _auth: AuthSericeService,
    private _crypting: EncryptionAndDecryptionService,
  ) { }


  ngOnInit(): void {
    // this.showName();
    this._showMenu();
    // console.log('Roldel usuariot',  this._crypting.userRole);
  }

  // Método que muestra el nombre del usuario en el Menú de navegación
  showName(): string {
    if (this._crypting.userName != null ) {
      this.userName = this._crypting.userName;
      return this.userName;
    }
  }

  // Obtiene un valor booleno, "true" si el usuario se encuentra logeado
  get isLogged(): boolean {
    let value: boolean;
    this._auth.isLogged.subscribe(
      (data) => {
        value = data;
      }
    )
    // console.log('Value of data 2: ',value);
    return value;
  }

  // Controlador que muestra las opciones del usuario dependiendo de si el usuario se encuentra logeado y su rol
  private _showMenu(): void {
    if ( this.isLogged && this._crypting.userRole === 1 ) this._menuAdmin();
    if ( this.isLogged && this._crypting.userRole === 2 ) this._capturistMenu();
  }

  // Muestra las opciones del alministrador en el Menú de navegación
  private _menuAdmin(): void {
    this.menuItems = [
      {
        label: 'Administración',
        icon: 'pi pi-key',
        items: [
          {
            label: 'Usuarios',
            icon: 'pi pi-user-edit',
            routerLink: 'adm/users'
          },
          {
            label: 'Procesos',
            icon: 'pi pi-sitemap',
            routerLink: 'adm/processes'
          },
          {
            label: 'Proyectos',
            icon: 'pi pi-folder-open',
            routerLink: 'adm/projects'
          },
          {
            label: 'Clientes',
            icon: 'pi pi-users',
            routerLink: 'adm/clients'
          },
          {
            label: 'Tipos de documentos',
            icon: 'pi pi-file',
            routerLink: 'adm/docTypes'
          },
          {
            label: 'Edición de documentos',
            icon: 'pi pi-pencil',
            routerLink: 'adm/documents'
          }
        ]
      },
      {
        label: 'Registro de documentos',
        icon: 'pi pi-file-pdf',
        routerLink: 'capturist/docCreation'
      },
      {
        label: 'Búsqueda de documentos',
        icon: 'pi pi-search',
        routerLink: 'firstView'
      }
    ]
  }

  // Muestra las opciones del capturista en el Menú de navegación
  private _capturistMenu(): void {
    this.menuItems = [
      {
        label: 'Registro de documentos',
        icon: 'pi pi-file-pdf',
        routerLink: 'capturist/docCreation'
      },
      {
        label: 'Búsqueda de documentos',
        icon: 'pi pi-search',
        routerLink: 'firstView'
      }
    ]
  }
}
