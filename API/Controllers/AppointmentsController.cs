using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Doctors;
using Application.Appointments;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class AppointmentsController : BaseApiController
    {

        
        [HttpGet]
        public async Task<ActionResult<List<Appointment>>> GetAppointments()
        {
            return await Mediator.Send(new ListAppointments.Query());
        }

        [HttpGet("{id}")] 

        public async Task<ActionResult<Appointment>> GetAppointment(Guid id)
        {
          return await Mediator.Send(new AppointmentsDetails.Query{Id = id});

        }

        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> CreateAppointment(Appointment appointment, string patientId, string doctorId) {
            return Ok(await Mediator.Send(new CreateAppointment.Command{Appointment= appointment,
            PatientId = patientId, DoctorId = doctorId }
            ));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAppointment(Guid id, Appointment appointment) {
            appointment.Id = id;
            return Ok(await Mediator.Send(new EditAppointment.Command{Appointment = appointment}));
        }
        [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteAppointment(Guid id) {
             return Ok(await Mediator.Send(new DeleteAppointment.Command{Id = id}));
         }

         

    }
}