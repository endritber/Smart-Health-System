using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.CBCs
{
    public class ListCBC
    {
        public class Query : IRequest<List<CBC>> {}

        public class Handler : IRequestHandler<Query, List<CBC>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<CBC>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.CBCs.ToListAsync();
            }
        }
    }
}