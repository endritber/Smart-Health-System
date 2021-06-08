using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Heights;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HeightController : BaseApiController
    {
        // [Authorize]
        [HttpGet("{id}")] 

        public async Task<ActionResult<Height>> GetHeight(Guid id)
        {
          return await Mediator.Send(new ReadHeight.Query{Id = id});

        }
          [HttpPut("{id}")]
        public async Task<IActionResult> EditHeight(Guid id, Height height) {
            height.heightId = id;
            return Ok(await Mediator.Send(new EditHeight.Command{Height = height}));
        }
          [HttpPost("{patientId}")]
        public async Task<IActionResult> CreateHeight(Height height, string patientId) {
            return Ok(await Mediator.Send(new CreateHeight.Command{Height= height,
            PatientId = patientId}
            ));
        }
        [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteHeight(Guid id) {
             return Ok(await Mediator.Send(new DeleteHeight.Command{Id = id}));
         }
           
        [HttpGet]
        public async Task<ActionResult<List<Height>>> ListHeight()
        {
            return await Mediator.Send(new ListHeight.Query());
        }

    }
}