using Microsoft.EntityFrameworkCore;
using myApp.Data;
using myApp.Models.Entities;
using myApp.Services.TicketService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("MyConnectionString")));
builder.Services.AddScoped<TicketCrudService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        corsBuilder =>
        {
            corsBuilder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
        });
});


var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();




app.Run();


