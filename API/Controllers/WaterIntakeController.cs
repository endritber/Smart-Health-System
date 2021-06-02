using System;
using System.Threading.Tasks;
using Application.WaterI;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WaterIntakeController :BaseApiController
    {
        
        [Authorize]
        [HttpGet("{id}")] 

        public async Task<ActionResult<WaterIntake>> GetWaterIntake(Guid id)
        {
          return await Mediator.Send(new ReadWaterI.Query{Id = id});

        }
          [HttpPut("{id}")]
        public async Task<IActionResult> EditWaterIntake(Guid id, WaterIntake waterIntake) {
            waterIntake.waterId = id;
            return Ok(await Mediator.Send(new EditWaterI.Command{Water = waterIntake}));
        }
    }
}