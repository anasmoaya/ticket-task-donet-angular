using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using myApp.ExceptionHandler;
using myApp.Models.DTOs;
using myApp.Models.Entities;
using myApp.Services.TicketService;

namespace myApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly TicketCrudService service;

        public TicketController(TicketCrudService ticketService)
        {
            this.service = ticketService;
        }


        [HttpGet]
        public IActionResult getAllTickets()
        {
            return Ok(service.getAllTickets());
        }

        [HttpPost("page")]
        public IActionResult getNextTickets( PaginationRequest pagination)
        {
            return Ok(service.getNext(pagination));
        }


        [HttpPost]
        public IActionResult addTickets(AddTicketDto ticket)
        {
            return Ok(service.addTicket(ticket));
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult deleteTickets(int id)
        {
            ServiceResult<Ticket> serviceResult = service.deleteTicket(id);
            if (!serviceResult.Success)
            {
                return BadRequest(serviceResult.ErrorMessage);
            }
            return Ok(serviceResult.Data);
        }

        [HttpPut]
        public IActionResult updateTicket(UpdateTicketDto ticket)
        {
            ServiceResult<Ticket> result = service.updateTicket(ticket);
            if (!result.Success)
            {
               return BadRequest(result.ErrorMessage);
            }
            return Ok(result.Data);
        }


    }
}
