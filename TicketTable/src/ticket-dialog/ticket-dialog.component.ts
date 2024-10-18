import {Component, Inject, Input} from '@angular/core';
import {Ticket} from '../models/ticket.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DateOnlyPipe} from '../pipes/date-only.pipe';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-ticket-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,

  ],
  templateUrl: './ticket-dialog.component.html',
  styleUrl: './ticket-dialog.component.css'
})
export class TicketDialogComponent {

   ticket: Ticket;
   action: string ;
   dateOnlyPipe : DateOnlyPipe = new DateOnlyPipe();
  ticketForm: FormGroup;



  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,     private fb: FormBuilder

  ) {
    this.ticket = { ...data.ticket };
    this.action= data.action;
    this.ticketForm = this.fb.group({
      description: [data.ticket?.description || this.ticket.description, [Validators.required]],
      date: [data.ticket?.date || this.ticket.date, [Validators.required]],
      status: [data.ticket?.status || this.ticket.status, [Validators.required]]
    });

  }

  onSubmit(): void {

    if (this.ticketForm.valid) {
      const formValues = this.ticketForm.value;
      const updatedTicket = {
        ...this.ticket,
        ...formValues,
      };
      updatedTicket.date = this.dateOnlyPipe.transform(updatedTicket.date)
      this.dialogRef.close(updatedTicket);
    }


    this.ticket.date = this.dateOnlyPipe.transform(this.ticket.date)

  }
}
