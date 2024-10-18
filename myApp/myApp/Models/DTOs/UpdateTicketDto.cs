namespace myApp.Models.DTOs
{
    public class UpdateTicketDto
    {
       public int Id { get; set; }
        public required string Description { get; set; }
        public required string Status { get; set; }
        public DateOnly Date { get; set; }
    }
}
