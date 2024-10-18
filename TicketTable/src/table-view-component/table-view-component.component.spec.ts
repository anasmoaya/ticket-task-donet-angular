import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { TableViewComponentComponent } from './table-view-component.component';
import { CrudService } from '../services/crud.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ticket } from '../models/ticket.model';
import {MatNativeDateModule} from '@angular/material/core';

describe('TableViewComponentComponent', () => {
  let component: TableViewComponentComponent;
  let fixture: ComponentFixture<TableViewComponentComponent>;
  let mockCrudService: jasmine.SpyObj<CrudService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async () => {
    mockCrudService = jasmine.createSpyObj('CrudService', ['getAllTickets', 'addTicket', 'updateTicket', 'deleteTicket']);
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', { open: dialogRefSpy });

    // Set up `afterClosed` to return a mock observable, you can change this as needed
    dialogRefSpy.afterClosed.and.returnValue(of({})); // Replace with a mock ticket as needed


    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      declarations: [TableViewComponentComponent],
      providers: [
        { provide: CrudService, useValue: mockCrudService },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableViewComponentComponent);
    component = fixture.componentInstance;
    mockCrudService = TestBed.inject(CrudService) as jasmine.SpyObj<CrudService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tickets on initialization', () => {
    const mockTickets: Ticket[] = [
      { id: 1, description: 'Test Ticket', status: 'Open', date: new Date() } as Ticket,
      { id: 2, description: 'Another Ticket', status: 'Closed', date: new Date() } as Ticket
    ];
    mockCrudService.getAllTickets.and.returnValue(of(mockTickets));

    component.ngOnInit();

    expect(mockCrudService.getAllTickets).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockTickets);
  });

  it('should filter tickets by description', () => {
    component.dataSource.data = [
      { id: 1, description: 'Open Ticket', status: 'Open', date: new Date() } as Ticket,
      { id: 2, description: 'Closed Ticket', status: 'Closed', date: new Date() } as Ticket
    ];
    component.applyDescriptionFilter({ target: { value: 'Open' } } as any);

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].description).toContain('Open');
  });

  it('should filter tickets by date range', () => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 1);

    component.dataSource.data = [
      { id: 1, description: 'Today Ticket', status: 'Open', date: today } as Ticket,
      { id: 2, description: 'Past Ticket', status: 'Closed', date: pastDate } as Ticket
    ];

    component.startDate = pastDate;
    component.endDate = today;
    component.applyDateRangeFilter();

    expect(component.dataSource.filteredData.length).toBe(2);
  });

  it('should filter tickets by status', () => {
    component.dataSource.data = [
      { id: 1, description: 'Open Ticket', status: 'Open', date: new Date() } as Ticket,
      { id: 2, description: 'Closed Ticket', status: 'Closed', date: new Date() } as Ticket
    ];

    component.statusFilter = 'Open';
    component.applyStatusFilter();

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].status).toBe('Open');
  });

  it('should open dialog on add', () => {
    component.onAdd();
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should open dialog on update', () => {
    const ticket: Ticket = { id: 1, description: 'Test Ticket', status: 'Open', date: new Date() } as Ticket;
    component.onUpdate(ticket);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should add a ticket on dialog close', () => {
    const newTicket: Ticket = { id: 3, description: 'New Ticket', status: 'Open', date: new Date() } as Ticket;
    const dialogRefSpy = jasmine.createSpyObj<MatDialogRef<any>>('MatDialogRef', ['afterClosed']);
    dialogSpy.open.and.returnValue(dialogRefSpy as any);
    mockCrudService.addTicket.and.returnValue(of(newTicket));

    component.onAdd();

    expect(mockCrudService.addTicket).toHaveBeenCalledWith(newTicket);
    expect(component.dataSource.data).toContain(newTicket);
  });

  it('should update a ticket on dialog close', () => {
    const updatedTicket: Ticket = { id: 1, description: 'Updated Ticket', status: 'Closed', date: new Date() } as Ticket;
    component.dataSource.data = [{ id: 1, description: 'Test Ticket', status: 'Open', date: new Date() } as Ticket];
    const dialogRefSpy = { afterClosed: () => of(updatedTicket) };
    dialogSpy.open.and.returnValue(dialogRefSpy as any);
    mockCrudService.updateTicket.and.returnValue(of(updatedTicket));

    component.onUpdate(updatedTicket);

    expect(mockCrudService.updateTicket).toHaveBeenCalledWith(updatedTicket);
    expect(component.dataSource.data[0].description).toBe('Updated Ticket');
  });

  it('should delete a ticket', () => {
    const ticket: Ticket = { id: 1, description: 'Test Ticket', status: 'Open', date: new Date() } as Ticket;
    component.dataSource.data = [ticket];
    mockCrudService.deleteTicket.and.returnValue(of(ticket));

    component.onDelete(ticket);

    expect(mockCrudService.deleteTicket).toHaveBeenCalledWith(ticket.id);
    expect(component.dataSource.data.length).toBe(0);
  });
});
