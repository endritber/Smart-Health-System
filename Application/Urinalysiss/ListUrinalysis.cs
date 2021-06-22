using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Urinalysiss
{
    public class ListUrinalysis
    {
        public class Query : IRequest<List<Urinalysis>> {}

        public class Handler : IRequestHandler<Query, List<Urinalysis>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Urinalysis>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.UrinalysisList.ToListAsync();
            }
        }
    }
}