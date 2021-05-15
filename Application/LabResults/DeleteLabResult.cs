using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.LabResults
{
    public class DeleteLabResult
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
                var labresult = await _context.LabResults.FindAsync(request.Id);

                _context.Remove(labresult);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}