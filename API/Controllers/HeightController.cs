using System;
<<<<<<< HEAD
=======
using System.Collections.Generic;
>>>>>>> b0173223e505c1dc3263994922ac53cc9c88de4d
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
        [Authorize]
        [HttpGet("{id}")] 

        public async Task<ActionResult<Height>> ReadHeight(Guid id)
        {
          return await Mediator.Send(new ReadHeight.Query{Id = id});

        }
          [HttpPut("{id}")]
        public async Task<IActionResult> EditHeight(Guid id, Height height) {
            height.heightId = id;
            return Ok(await Mediator.Send(new EditHeight.Command{Height = height}));
        }
<<<<<<< HEAD
=======
    
>>>>>>> b0173223e505c1dc3263994922ac53cc9c88de4d
    }
}