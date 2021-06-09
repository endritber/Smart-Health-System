using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Appointment
{
    public class CreateAppointment
    {
            public class Command : IRequest
        {
            public Appointments Appointment { get; set; }

            public string PatientId { get; set; }

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
    
                var patient = await _context.Patients.FindAsync(request.PatientId);


                // request.Appointment.patient = patient;


                // patient.Appointments.Add(request.Appointment);


                _context.Appointments.Add(request.Appointment);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}