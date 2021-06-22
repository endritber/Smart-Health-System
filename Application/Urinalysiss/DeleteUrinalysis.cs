using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Urinalysiss
{
    public class DeleteUrinalysis
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
                var urinalysis = await _context.UrinalysisList.FindAsync(request.Id);

                _context.Remove(urinalysis);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}