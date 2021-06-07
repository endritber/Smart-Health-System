using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Doctors;
using Application.LabResults;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class LabResultsController : BaseApiController
    {

        
        [HttpGet]
        public async Task<ActionResult<List<LabResult>>> GetLabResults()
        {
            return await Mediator.Send(new ListLabResults.Query());
        }

        [HttpGet("{id}")] 

        public async Task<ActionResult<LabResult>> GetLabResult(Guid id)
        {
          return await Mediator.Send(new LabResultsDetails.Query{Id = id});

        }

        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> CreateLabResult(LabResult labresult, string patientId, string doctorId) {
            return Ok(await Mediator.Send(new CreateLabResult.Command{LabResult= labresult,
            PatientId = patientId, DoctorId = doctorId }
            ));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLabResult(Guid id, LabResult labresult) {
            labresult.Id = id;
            return Ok(await Mediator.Send(new EditLabResult.Command{LabResult = labresult}));
        }
        [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteLabResult(Guid id) {
             return Ok(await Mediator.Send(new DeleteLabResult.Command{Id = id}));
         }

         

    }
}