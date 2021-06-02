using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Heights
{
    public class ListHeight
    {
         public class Query : IRequest<List<Height>> {}

        public class Handler : IRequestHandler<Query, List<Height>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Height>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Heights.ToListAsync(cancellationToken);
            }
        }
    }
}