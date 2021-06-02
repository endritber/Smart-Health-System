using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.WaterI
{
    public class DeleteWaterI
    {
         public class Command : IRequest
        {
            public Guid Id{get; set;}

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var water = await _context.WaterIntakes.FindAsync(request.Id);

                _context.Remove(water);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}