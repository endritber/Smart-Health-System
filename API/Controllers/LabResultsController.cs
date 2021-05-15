using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class LabResultsController : BaseApiController
    {
        private readonly DataContext _context;
        public LabResultsController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]        
        public async Task<ActionResult<List<LabResult>>> GetLabResults() 
        {
            return await _context.LabResults.ToListAsync();
        }

        [HttpGet("{id}")]
         public async Task<ActionResult<LabResult>> GetLabResult(Guid id) 
        {
            return await _context.LabResults.FindAsync(id);
        }
    }
}