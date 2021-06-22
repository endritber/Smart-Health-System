using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.CBCs
{
    public class CBCDetail
    {
        public class Query : IRequest<CBC>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, CBC>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<CBC> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.CBCs.FindAsync(request.Id);

            }
        }
    }
}