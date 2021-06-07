using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Prescriptions;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PrescriptionsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Prescription>>> GetPrescriptions()
        {
            return await Mediator.Send(new ListPrescriptions.Query());
        }

        [HttpGet("{id}")] //prescriptions/id

        public async Task<ActionResult<Prescription>> GetPrescriptions(Guid id)
        {
          return await Mediator.Send(new PrescriptionsDetails.Query{Id = id});
        }

        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> CreatePrescription(Prescription prescription, string patientId, string doctorId) {
            return Ok(await Mediator.Send(new CreatePrescription.Command{Prescription= prescription,
            PatientId = patientId, DoctorId = doctorId }
            ));
        }

        [HttpPut("{id}")]
        //Logic error cannot change prescription data
        public async Task<IActionResult> EditPrescription(Guid id, Prescription prescription) {
            prescription.Id = id;
            return Ok(await Mediator.Send(new EditPrescription.Command{Prescription = prescription}));
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> DeletePrescription(Guid id) {
             return Ok(await Mediator.Send(new DeletePrescription.Command{Id = id}));
         }

    }
}