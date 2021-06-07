using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Allergies
{
    public class AllergyDetail
    {
        public class Query : IRequest<Allergy>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Allergy>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Allergy> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.Allergies.FindAsync(request.Id);

            }
        }
    }
}