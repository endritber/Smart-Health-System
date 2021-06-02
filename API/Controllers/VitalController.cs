using System;
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
        [Authorize]
        [HttpGet("{id}")] 

        public async Task<ActionResult<Vitals>> ReadHeight(Guid id)
        {
          return await Mediator.Send(new ReadVitals.Query{Id = id});

        }
          [HttpPut("{id}")]
        public async Task<IActionResult> EditHeight(Guid id, Vitals vitals) {
            vitals.Id = id;
            return Ok(await Mediator.Send(new EditVitals.Command{Vital = vitals}));
        }
        
    }
    }
}