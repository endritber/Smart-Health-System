using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Weights
{
    public class ListWeight
    {
        
         public class Query : IRequest<List<Weight>> {}

        public class Handler : IRequestHandler<Query, List<Weight>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Weight>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Weights.ToListAsync(cancellationToken);
            }
        }
    }
}