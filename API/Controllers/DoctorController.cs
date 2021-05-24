using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Doctors;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DoctorController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<DoctorDto>>> GetDoctors()
        {
            return await Mediator.Send(new ListDoctors.Query());
        }

        
        [HttpGet("{id}")] //doctor/id

        public async Task<ActionResult<DoctorDto>> GetDoctor(String id)
        {
          return await Mediator.Send(new DoctorDetail.Query{Id = id});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDoctor(String id, Doctor doctor) {
            doctor.Id = id;
            return Ok(await Mediator.Send(new EditDoctor.Command{Doctor = doctor}));
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteDoctor(string id) {
             return Ok(await Mediator.Send(new DeleteDoctor.Command{Id = id}));
         }
    }
    
}
