using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Vital;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VitalController
    {
         public class HeightController : BaseApiController
    {
        // [Authorize]
        [HttpGet("{id}")] 

        public async Task<ActionResult<Vitals>> ReadVital(Guid id)
        {
          return await Mediator.Send(new ReadVitals.Query{Id = id});

        }
          [HttpPut("{id}")]
        public async Task<IActionResult> EditVital(Guid id, Vitals vitals) {
            vitals.Id = id;
            return Ok(await Mediator.Send(new EditVitals.Command{Vital = vitals}));
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Vitals>>> ListVital()
        {
            return await Mediator.Send(new ListVitals.Query());
        }
        // [HttpPost("{patientId}")]
        // public async Task<IActionResult> CreateVital(Vitals vital, string patientId) {
        //     return Ok(await Mediator.Send(new C.Command{Height= height,
        //     PatientId = patientId}
        //     ));
        // }
        
    }
    }
}