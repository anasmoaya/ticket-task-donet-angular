import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {CdkTableModule} from '@angular/cdk/table';
import {CrudService} from '../services/crud.service';
import {Ticket} from '../models/ticket.model';
import {TicketDialogComponent} from '../ticket-dialog/ticket-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInput} from '@angular/material/input';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {
  DateRange,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker, MatEndDate, MatStartDate
} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {DatePipe} from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-table-view-component',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatButton,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatTableModule,
    MatButtonModule,
    CdkTableModule,
    MatPaginator,
    MatSort,
    MatSortModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatFormFieldModule,
    MatDatepickerInput,
    FormsModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDateRangeInput,
    MatDateRangePicker,
    MatNativeDateModule,
    MatStartDate,
    MatEndDate,
    MatSelect,
    MatOption,
    DatePipe,
    MatSnackBarModule
  ],
  templateUrl: './table-view-component.component.html',
  styleUrl: './table-view-component.component.css'
})
export class TableViewComponentComponent implements  OnInit , AfterViewInit {
  private _ticketCrudService: CrudService;

  constructor(ticketCrudService: CrudService, private dialog: MatDialog , private snackBar: MatSnackBar) {
    this._ticketCrudService = ticketCrudService;
  }

  displayedColumns: string[] = ['id', 'description', 'status', 'date', 'actions'];
  footerColumns: string[] = ['footer'];
  tickets: Ticket[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Ticket>([]);
  addedTicket!: Ticket
  startDate!: Date;
  endDate!: Date;
  descriptionFilter = '';
  statusFilter = ''; 





  ngOnInit(): void {
    this.fetchTickets();


    this.dataSource.filterPredicate = (data: Ticket, filter: string) => {
      const filterObject = JSON.parse(filter);
      const ticketDate = new Date(data.date);

      if (filterObject.description) {
        if (!data.description.toLowerCase().includes(filterObject.description.toLowerCase())) {
          return false;
        }
      }

      if (filterObject.startDate || filterObject.endDate) {
        const startDate = filterObject.startDate ? new Date(filterObject.startDate) : null;
        const endDate = filterObject.endDate ? new Date(filterObject.endDate) : null;

        if (startDate && ticketDate < startDate) {
          return false;
        }
        if (endDate && ticketDate > endDate) {
          return false;
        }
      }

      if (filterObject.status && filterObject.status !== 'All') {
        return data.status === filterObject.status;
      }

      return true;
    };


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchTickets(): void {
    this._ticketCrudService.getAllTickets().subscribe(
      (data) => {

        this.tickets = data;
        this.dataSource.data = this.tickets;
        if(this.dataSource.data.length != 0){
          this.snackBar.open('Tickets fetched successfully!', 'Close', {
            duration: 3000, 
            verticalPosition: 'top', 
            panelClass: ['success-snackbar'], 
          });
        }
       
      },
       (err) => {
      this.snackBar.open('Failed to fetch tickets.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    }

    );
  }


  onUpdate(ticket: Ticket) {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '300px',
      data: {
        ticket: { ...ticket },
        action: 'Update'
      }
    });

    dialogRef.afterClosed().subscribe((updatedTicket) => {
      if (updatedTicket) {
        this._ticketCrudService.updateTicket(updatedTicket).subscribe(
          (responseTicket) => {

            const index = this.dataSource.data.findIndex(t => t.id === responseTicket.id);
            if (index > -1) {
              this.dataSource.data[index] = responseTicket;
              this.dataSource.data = [...this.dataSource.data];
            }

            this.snackBar.open('Ticket updated successfully!', 'Close', {
              duration: 3000, 
              verticalPosition: 'top', 
              panelClass: ['success-snackbar'], 
            });
          },
          (error) => {
            this.snackBar.open('Failed to update ticket.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          }
        );
      }
    });
  }


  onDelete(ticket: Ticket) {

    this._ticketCrudService.deleteTicket(ticket.id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(t => t.id !== ticket.id)
        this.snackBar.open('Ticket deleted successfully!', 'Close', {
          duration: 3000, 
          verticalPosition: 'top',
          panelClass: ['success-snackbar'], 
        });
      },
      (error) => {
        this.snackBar.open('Failed to delete ticket.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    )
  }

  onAdd() {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '300px',
      data: {
        action: 'Add'
      }
    });

    dialogRef.afterClosed().subscribe((addedTicket) => {
      if (addedTicket) {
        this._ticketCrudService.addTicket(addedTicket).subscribe(
          (data) => {
            this.addedTicket = data;

            this.dataSource.data = [...this.dataSource.data, this.addedTicket];
            this.snackBar.open('Ticket added successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
          },
          (error) => {
            this.snackBar.open('Failed to add ticket.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            });
          }
        );
      }
    });
  }

  applyDescriptionFilter(event: Event): void {
    this.descriptionFilter = (event.target as HTMLInputElement).value;
    this.applyCombinedFilter();
  }

  applyDateRangeFilter(): void {
    this.applyCombinedFilter();
  }

  applyStatusFilter(): void {
    this.applyCombinedFilter();
  }

  applyCombinedFilter(): void {
    this.dataSource.filter = JSON.stringify({
      description: this.descriptionFilter || '',
      startDate: this.startDate ? this.startDate.toISOString() : '',
      endDate: this.endDate ? this.endDate.toISOString() : '',
      status: this.statusFilter || ''
    });
  }


}
