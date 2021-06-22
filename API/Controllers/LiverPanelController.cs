using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.LiverPanels;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LiverPanelController:BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<LiverPanel>>> GetLiverPanels()
        {
            return await Mediator.Send(new ListLiverPanel.Query());
        }

        [HttpGet("{id}")] //liverpanel/id

        public async Task<ActionResult<LiverPanel>> GetLiverPanel(Guid id)
        {
          return await Mediator.Send(new LiverPanelDetail.Query{Id = id});
        }

        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> CreateLiverPanel(LiverPanel liverpanel, string patientId, string doctorId) {
            return Ok(await Mediator.Send(new CreateLiverPanel.Command{LiverPanel= liverpanel,
            PatientId = patientId, DoctorId = doctorId }
            ));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLiverPanel(Guid id, LiverPanel liverpanel) {
            liverpanel.Id = id;
            return Ok(await Mediator.Send(new EditLiverPanel.Command{LiverPanel = liverpanel}));
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteLiverPanel(Guid id) {
             return Ok(await Mediator.Send(new DeleteLiverPanel.Command{Id = id}));
         }

    }
}
