using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Prescriptions
{
    public class ListPrescriptions
    {
        public class Query : IRequest<List<Prescription>> {}

        public class Handler : IRequestHandler<Query, List<Prescription>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Prescription>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Prescriptions.ToListAsync();
            }
        }
    }
}