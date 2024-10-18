using myApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;
namespace myApp.Models.Entities
{
    public class Ticket
    {
        public int Id { get; set; }
        public required string Description { get; set; }
        public required string Status { get; set; }
        public DateOnly Date { get; set; }

    }
}