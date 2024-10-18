import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TableViewComponentComponent} from '../table-view-component/table-view-component.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TableViewComponentComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'TicketTable';
}
