using System;
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
          [Authorize]
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
    }
}