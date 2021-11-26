import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

interface docComment {
  docName:    string;
  comment:    string;
  modifyDate: string;
}

@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.css']
})
export class ShowCommentsComponent implements OnInit {

  
  constructor(
    private _dialogRef: MatDialogRef<ShowCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) private _comment: docComment,

    private _datePipe: DatePipe,
    ) { }
    
  public docName:     string = this._comment.docName;
  public comment:     string[] = this._comment.comment.split(',');
  public modifyDate:  string = this._datePipe.transform(this._comment.modifyDate, 'yyyy-MM-dd hh:mm');

  ngOnInit(): void {
    this.comment.pop();
  }

  public cerrarPopUp = (): void => {
    this._dialogRef.close();
  }
}
