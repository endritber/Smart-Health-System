using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.LabResults
{
    public class ListLabResults
    {
        public class Query : IRequest<List<LabResult>> {}

        public class Handler : IRequestHandler<Query, List<LabResult>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<LabResult>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.LabResults.ToListAsync(cancellationToken);
            }
        }
    }
}