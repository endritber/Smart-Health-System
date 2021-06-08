using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Appointment
{
    public class DeleteAppointment
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
                var appointment = await _context.Appointments.FindAsync(request.Id);

                _context.Remove(appointment);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}