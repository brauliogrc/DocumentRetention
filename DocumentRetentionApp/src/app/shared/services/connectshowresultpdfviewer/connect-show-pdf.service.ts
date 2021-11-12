import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectShowPdfService {

  constructor() { }

  private _filePdf: string;

  public setFileName( fileName: string ) {
    this._filePdf = fileName;
  }

  get getFileName(): string {
    return this._filePdf;
  }
}
