using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Prescriptions
{
    public class PrescriptionsDetails
    {
        public class Query : IRequest<Prescription>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Prescription>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Prescription> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.Prescriptions.FindAsync(request.Id);

            }
        }
    }
}