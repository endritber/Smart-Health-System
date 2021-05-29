using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Appointment
{
    public class ReadAppointment
    {
          public class Query : IRequest<Appointments>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Appointments>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Appointments> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.Appointmentss.FindAsync(request.Id);

            }

        }
    }
}