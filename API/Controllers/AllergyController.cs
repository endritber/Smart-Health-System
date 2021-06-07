using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Allergies;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AllergyController : BaseApiController
    {


    [HttpGet("{id}")] 

        public async Task<ActionResult<Allergy>> GetLabResult(Guid id)
        {
          return await Mediator.Send(new AllergyDetail.Query{Id = id});

        }

      [HttpPut("{id}")]
        public async Task<IActionResult> EditAllergy(Guid id, Allergy allergy) {
            allergy.Id = id;
            return Ok(await Mediator.Send(new EditAllergy.Command{Allergy = allergy}));
        }

     [HttpGet]
        public async Task<ActionResult<List<Allergy>>> GetAllergies()
        {
            return await Mediator.Send(new ListAllergies.Query());
        }


        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> CreateAllergy(Allergy allergy, string patientId, string doctorId) {
            return Ok(await Mediator.Send(new CreateAllergy.Command{Allergy= allergy,
            PatientId = patientId, DoctorId = doctorId }
            ));
        }

             [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteAllergy(Guid id) {
             return Ok(await Mediator.Send(new DeleteAllergy.Command{Id = id}));
         }
    }
}