import { Injectable } from '@angular/core';
import {environment} from '../env/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticket} from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService {

  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl)
  }
  deleteTicket(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
  updateTicket(Ticket:Ticket):Observable<Ticket>{
    return this.http.put<Ticket>(`${this.apiUrl}`, Ticket)
  }

  addTicket(addedTicket: Ticket) :Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}`, addedTicket)
  }


}
