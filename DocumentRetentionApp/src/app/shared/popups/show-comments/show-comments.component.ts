import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface docComment {
  docName: string;
  comment: string;
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
    ) { }
    
  public docName: string = this._comment.docName;
  public comment: string = this._comment.comment;

  ngOnInit(): void {
  }

  public cerrarPopUp = () => {
    this._dialogRef.close();
  }
}
