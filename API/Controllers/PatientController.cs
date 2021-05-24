using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Doctors;
using Application.Patients;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PatientController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<PatientDto>>> GetPatients()
        {
            return await Mediator.Send(new ListPatients.Query());
        }

        [HttpGet("{id}")] //patient/id

        public async Task<ActionResult<PatientDto>> GetPatient(string id)
        {
          return await Mediator.Send(new PatientDetail.Query{Id = id});
        }

        [HttpPost]


        [HttpPut("{id}")]
        public async Task<IActionResult> EditPatient(String id, Patient patient) {
            patient.Id = id;
            return Ok(await Mediator.Send(new EditPatient.Command{Patient = patient}));
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> DeletePatient(string id) {
             return Ok(await Mediator.Send(new DeletePatient.Command{Id = id}));
         }

         [HttpPut("{patientId}/doctor/{doctorId}")]
        public async Task<IActionResult> AddDoctor(string patientId, string doctorId) {
            return Ok(await Mediator.Send(new AddDoctor.Command{PatientId = patientId, DoctorId = doctorId}));
         }
    }
}