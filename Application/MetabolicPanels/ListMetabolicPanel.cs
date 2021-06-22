using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.MetabolicPanels
{
    public class ListMetabolicPanel
    {
        public class Query : IRequest<List<MetabolicPanel>> {}

        public class Handler : IRequestHandler<Query, List<MetabolicPanel>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<MetabolicPanel>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.MetabolicPanels.ToListAsync();
            }
        }
    }
}