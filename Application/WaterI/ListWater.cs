using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WaterI
{
    public class ListWater
    {
        public class Query : IRequest<List<WaterIntake>> {}

        public class Handler : IRequestHandler<Query, List<WaterIntake>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<WaterIntake>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.WaterIntakes.ToListAsync(cancellationToken);
            }
        }
    }
}