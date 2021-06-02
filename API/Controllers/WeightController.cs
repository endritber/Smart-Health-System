using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Weights;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WeightController : BaseApiController
    {
          // [Authorize]
        [HttpGet("{id}")] 

        public async Task<ActionResult<Weight>> GetWeight(Guid id)
        {
          return await Mediator.Send(new ReadWeight.Query{Id = id});

        }
          [HttpPut("{id}")]
        public async Task<IActionResult> EditWeight(Guid id, Weight weight) {
            weight.weightId = id;
            return Ok(await Mediator.Send(new EditWeight.Command{Weight = weight}));
        }
         [HttpGet]
        public async Task<ActionResult<List<Weight>>> ListWeight()
        {
            return await Mediator.Send(new ListWeight.Query());
        }
         [HttpPost("{patientId}")]
        public async Task<IActionResult> CreateWeight(Weight weight, string patientId) {

            return Ok(await Mediator.Send(new CreateWeight.Command{Weight= weight,
            PatientId = patientId}
            ));
        }

         [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteWeight(Guid id) {
             return Ok(await Mediator.Send(new DeleteWeight.Command{Id = id}));
         }
    }
}