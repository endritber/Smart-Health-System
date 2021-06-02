using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Heights
{
    public class DeleteHeight
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
                var heights = await _context.Heights.FindAsync(request.Id);

                _context.Remove(heights);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}