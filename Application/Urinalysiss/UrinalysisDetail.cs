using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Urinalysiss
{
    public class UrinalysisDetail
    {
        public class Query : IRequest<Urinalysis>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Urinalysis>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Urinalysis> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.UrinalysisList.FindAsync(request.Id);

            }
        }
    }
}