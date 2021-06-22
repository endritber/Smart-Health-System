using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.CBCs;
using Application.Urinalysiss;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UrinalysisController:BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Urinalysis>>> GetUrinalysis()
        {
            return await Mediator.Send(new ListUrinalysis.Query());
        }

        [HttpGet("{id}")] //urinalysis/id

        public async Task<ActionResult<Urinalysis>> GetUrinalysisDetail(Guid id)
        {
          return await Mediator.Send(new UrinalysisDetail.Query{Id = id});
        }

        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> CreateUrinalysis(Urinalysis urinalysis, string patientId, string doctorId) {
            return Ok(await Mediator.Send(new CreateUrinalysis.Command{Urinalysis= urinalysis,
            PatientId = patientId, DoctorId = doctorId }
            ));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUrinalysis(Guid id, Urinalysis urinalysis) {
            urinalysis.Id = id;
            return Ok(await Mediator.Send(new EditUrinalysis.Command{Urinalysis = urinalysis}));
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteUrinalysis(Guid id) {
             return Ok(await Mediator.Send(new DeleteUrinalysis.Command{Id = id}));
         }

    }
}
