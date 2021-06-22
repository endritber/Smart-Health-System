using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.LiverPanels
{
    public class ListLiverPanel
    {
        public class Query : IRequest<List<LiverPanel>> {}

        public class Handler : IRequestHandler<Query, List<LiverPanel>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<LiverPanel>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.LiverPanels.ToListAsync();
            }
        }
    }
}