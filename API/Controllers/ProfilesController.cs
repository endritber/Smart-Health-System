using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{ 
    public class ProfilesController: BaseApiController
    {
        [Route("api/[controller]")]
        [HttpGet("patient/{username}")]
        public async Task<ActionResult<PatientProfile>> GetPatientProfile(string username)
        {
          return await Mediator.Send(new PatientDetails.Query{UserName = username});
        }

        [HttpGet("doctor/{username}")]
        public async Task<ActionResult<DoctorProfile>> GetDoctorProfile(string username)
        {
          return await Mediator.Send(new DoctorDetails.Query{UserName = username});
        }
      
        
    }
}