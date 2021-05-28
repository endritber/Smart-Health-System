using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.WaterI
{
    public class ReadWaterI
    {
           public class Query : IRequest<WaterIntake>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, WaterIntake>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<WaterIntake> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.WaterIntakes.FindAsync(request.Id);

            }

        }
    }
}