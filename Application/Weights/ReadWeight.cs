using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Weights
{
    public class ReadWeight
    {
           public class Query : IRequest<Weight>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Weight>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Weight> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.Weights.FindAsync(request.Id);

            }
        }

    }
}