using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Heights
{
    public class ReadHeight
    {
          public class Query : IRequest<Height>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Height>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Height> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.Heights.FindAsync(request.Id);

            }

        }
    }
}