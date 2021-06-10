using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Appointments
{
    public class CreateAppointment {

        public class Command : IRequest
        {
            public Appointment Appointment { get; set; }

            public string PatientId { get; set; }

            public string DoctorId { get; set; }
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

                var doctor = await _context.Doctors.FindAsync(request.DoctorId);

                request.Appointment.patient = patient;

                request.Appointment.doctor = doctor;

                patient.Appointments.Add(request.Appointment);
                
                doctor.Appointments.Add(request.Appointment);

                 _context.Appointments.Add(request.Appointment);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
