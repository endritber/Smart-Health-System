using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.PatientInfos;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class PatientsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<PatientDto>>> GetPatients()
        {
            return await Mediator.Send(new ListPatients.Query());
        }

        
        [HttpGet("{id}")] //patients/id

        public async Task<ActionResult<PatientDto>> GetPatient(Guid id)
        {
          return await Mediator.Send(new PatientDetails.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreatePatient(PatientInfo patient) {
            return Ok(await Mediator.Send(new AddPatient.Command{PatientInfo = patient}));
        }


        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPatient(Guid id, PatientInfo patient) {
            patient.Id = id;
            return Ok(await Mediator.Send(new EditPatient.Command{PatientInfo = patient}));
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> DeletePatient(Guid id) {
             return Ok(await Mediator.Send(new DeletePatient.Command{Id = id}));
         }

    }
}