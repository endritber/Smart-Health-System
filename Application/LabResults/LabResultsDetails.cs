using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.LabResults
{
    public class LabResultsDetails
    {
        public class Query : IRequest<LabResult>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, LabResult>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<LabResult> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.LabResults.FindAsync(request.Id);

            }
        }
    }
}