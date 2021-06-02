using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vital
{
    public class ReadVitals
    {
        
          public class Query : IRequest<Vitals>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Vitals>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Vitals> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.Vitalss.FindAsync(request.Id);

            }

        }
    }
}