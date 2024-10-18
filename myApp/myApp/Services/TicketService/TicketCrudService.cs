
using myApp.Data;
using myApp.ExceptionHandler;
using myApp.Models.DTOs;
using myApp.Models.Entities;

namespace myApp.Services.TicketService
{


    public class TicketCrudService : ITicketCrudService
    {
        private readonly ApplicationDbContext dbContext;

        public TicketCrudService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public Ticket addTicket(AddTicketDto ticket)
        {
            var persistentTicket = new Ticket() {
                Description = ticket.Description,
                Status= ticket.Status,
                Date = ticket.Date,
            };
            dbContext.tickets.Add(persistentTicket);
            dbContext.SaveChanges();

            return persistentTicket ;
        }

        public List<Ticket> getAllTickets()
        {
            var tickets = dbContext.tickets.ToList();
            return tickets;
        }

        public List<Ticket> getNext(PaginationRequest pagination)
        {
            var tickets = dbContext.tickets
                .OrderBy(e=>e.Id)
                .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                .Take(pagination.PageSize)
                .ToList();
            return tickets;
        }

        public ServiceResult<Ticket> getTicketById(int id)
        {
            var ticket = dbContext.tickets.Find(id);
            if (ticket == null)
            {
                return new ServiceResult<Ticket>
                {
                    Success = false,
                    ErrorMessage = "ID mismatch"
                };
            }
            return new ServiceResult<Ticket>
            {
                Success = true,
                Data = ticket
            };
        }

        public ServiceResult<Ticket> deleteTicket(int id)
        {
            ServiceResult<Ticket> t = getTicketById(id);
            if (t.Success)
            {
                dbContext.Remove(t.Data);
                dbContext.SaveChanges();
            }
            return t;
           
        }

        public ServiceResult<Ticket> updateTicket(UpdateTicketDto ticketDto)
        {
            ServiceResult<Ticket> result = getTicketById(ticketDto.Id);
            if (result.Success)
            {
                Ticket existingTicket = result.Data;
                if (ticketDto.Description != null)
                {
                    existingTicket.Description = ticketDto.Description;
                }
                if (ticketDto.Status != null)
                {
                    existingTicket.Status = ticketDto.Status;
                }
                if (ticketDto.Date != DateOnly.MinValue)
                {
                    existingTicket.Date = ticketDto.Date;
                }
                dbContext.tickets.Update(existingTicket);
                dbContext.SaveChanges();
                return new ServiceResult<Ticket>()
                {
                    Data = existingTicket,
                    Success = true
                };

            }
            return result ;
        }
    }
}
