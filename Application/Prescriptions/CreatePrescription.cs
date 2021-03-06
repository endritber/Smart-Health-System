using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Prescriptions
{
    public class CreatePrescription {

        public class Command : IRequest
        {
            public Prescription Prescription { get; set; }

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

                request.Prescription.patient = patient;

                request.Prescription.doctor = doctor;

                patient.Prescriptions.Add(request.Prescription);

                doctor.Prescribed.Add(request.Prescription);

                _context.Prescriptions.Add(request.Prescription);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
