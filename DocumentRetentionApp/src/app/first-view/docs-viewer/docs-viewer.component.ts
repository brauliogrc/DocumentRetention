import { Component, OnInit } from '@angular/core';

interface menuItems {
  name: string;
  code: string
}

@Component({
  selector: 'app-docs-viewer',
  templateUrl: './docs-viewer.component.html',
  styleUrls: ['./docs-viewer.component.css']
})
export class DocsViewerComponent implements OnInit {
  public menuItems: menuItems[] = [];
  public selectItem: menuItems;
  public value: Date;

  constructor() {
    this.menuItems = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  ngOnInit(): void { }

}
