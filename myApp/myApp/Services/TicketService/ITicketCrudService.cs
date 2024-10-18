namespace myApp.Services.TicketService
{
    using myApp.ExceptionHandler;
    using myApp.Models.DTOs;
    using myApp.Models.Entities;

    public interface ITicketCrudService
    {
        public List<Ticket> getAllTickets();
        public Ticket addTicket(AddTicketDto ticket);
        public ServiceResult<Ticket> deleteTicket(int  id);
        public ServiceResult<Ticket> updateTicket(UpdateTicketDto ticket);
        public List<Ticket> getNext(PaginationRequest pagination);
        public ServiceResult<Ticket> getTicketById(int id);

    }
}
