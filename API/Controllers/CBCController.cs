using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.CBCs;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CBCController:BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<CBC>>> GetCBCs()
        {
            return await Mediator.Send(new ListCBC.Query());
        }

        [HttpGet("{id}")] //cbc/id

        public async Task<ActionResult<CBC>> GetCBC(Guid id)
        {
          return await Mediator.Send(new CBCDetail.Query{Id = id});
        }

        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> CreateCBC(CBC cbc, string patientId, string doctorId) {
            return Ok(await Mediator.Send(new CreateCBC.Command{CBC= cbc,
            PatientId = patientId, DoctorId = doctorId }
            ));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCBC(Guid id, CBC cbc) {
            cbc.Id = id;
            return Ok(await Mediator.Send(new EditCBC.Command{CBC = cbc}));
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteCBC(Guid id) {
             return Ok(await Mediator.Send(new DeleteCBC.Command{Id = id}));
         }

    }
}
