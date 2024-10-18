namespace myApp.Models.DTOs
{
    public class AddTicketDto
    {
        public required string Description { get; set; }
        public required string Status { get; set; }
        public DateOnly Date { get; set; }

    }
}
