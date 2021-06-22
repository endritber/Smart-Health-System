using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.MetabolicPanels
{
    public class DeleteMetabolicPanel
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
                var metabolicpanel = await _context.MetabolicPanels.FindAsync(request.Id);

                _context.Remove(metabolicpanel);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}