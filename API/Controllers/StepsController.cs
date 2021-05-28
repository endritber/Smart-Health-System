// using System;
// using System.Threading.Tasks;
// using Application.Step;
// using Domain;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;

// namespace API.Controllers
// {
//     public class StepsController : BaseApiController
//     {
//          [Authorize]
//         [HttpGet("{id}")] 

//         public async Task<ActionResult<Steps>> ReadSteps(Guid id)
//         {
//           return await Mediator.Send(new ReadSteps.Query{Id = id});

//         }
//           [HttpPut("{id}")]
//         public async Task<IActionResult> EditSteps(Guid id, Steps steps) {
//             steps.stepsId = id;
//             return Ok(await Mediator.Send(new EditSteps.Command{Step = steps}));
//         }
//     }
// }