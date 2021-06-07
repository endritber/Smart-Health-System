using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Allergies
{
    public class DeleteAllergy
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
                var allergy = await _context.Allergies.FindAsync(request.Id);

                _context.Remove(allergy);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}