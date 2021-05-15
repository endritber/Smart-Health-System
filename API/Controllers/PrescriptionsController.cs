using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PrescriptionsController : BaseApiController
    {
        private readonly DataContext _context;
        public PrescriptionsController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]        
        public async Task<ActionResult<List<Prescription>>> GetLabResults() 
        {
            return await _context.Prescriptions.ToListAsync();
        }

        [HttpGet("{id}")]
         public async Task<ActionResult<Prescription>> GetLabResult(Guid id) 
        {
            return await _context.Prescriptions.FindAsync(id);
        }
    }
}