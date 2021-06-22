using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.MetabolicPanels;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MetabolicPanelController:BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<MetabolicPanel>>> GetMetabolicPanels()
        {
            return await Mediator.Send(new ListMetabolicPanel.Query());
        }

        [HttpGet("{id}")] //MetabolicPanel/id

        public async Task<ActionResult<MetabolicPanel>> GetMetabolicPanel(Guid id)
        {
          return await Mediator.Send(new MetabolicPanelDetail.Query{Id = id});
        }

        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> CreateMetabolicPanel(MetabolicPanel metabolicpanel, string patientId, string doctorId) {
            return Ok(await Mediator.Send(new CreateMetabolicPanel.Command{MetabolicPanel= metabolicpanel,
            PatientId = patientId, DoctorId = doctorId }
            ));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMetabolicPanel(Guid id, MetabolicPanel metabolicpanel) {
            metabolicpanel.Id = id;
            return Ok(await Mediator.Send(new EditMetabolicPanel.Command{MetabolicPanel = metabolicpanel}));
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteMetabolicPanel(Guid id) {
             return Ok(await Mediator.Send(new DeleteMetabolicPanel.Command{Id = id}));
         }

    }
}
