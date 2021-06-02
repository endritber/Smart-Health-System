using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vital
{
    public class ListVitals
    {
        
         public class Query : IRequest<List<Vitals>> {}

        public class Handler : IRequestHandler<Query, List<Vitals>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Vitals>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Vitalss.ToListAsync(cancellationToken);
            }
        }
    }
}