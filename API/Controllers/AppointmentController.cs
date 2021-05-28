using System;
using System.Threading.Tasks;
using Application.Appointment;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentController : BaseApiController
    {
         [Authorize]
        [HttpGet("{id}")] 

        public async Task<ActionResult<Appointments>> ReadAppointment(Guid id)
        {
          return await Mediator.Send(new ReadAppointment.Query{Id = id});

        }
          [HttpPut("{id}")]
        public async Task<IActionResult> EditAppointment(Guid id, Appointments appointments) {
            appointments.AppointmentId = id;
            return Ok(await Mediator.Send(new EditAppointment.Command{Appointment = appointments}));
        }
    }
}