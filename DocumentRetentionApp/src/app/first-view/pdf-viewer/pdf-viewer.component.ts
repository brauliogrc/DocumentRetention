import { Component, OnInit } from '@angular/core';

import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  public archivo = 'assets/ipv6.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
