using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using myApp.Models.Entities;

namespace myApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Ticket> tickets { get; set; }
    }
}
