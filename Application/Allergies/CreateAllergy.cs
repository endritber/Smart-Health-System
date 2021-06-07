using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Allergies
{
    public class CreateAllergy
    {
        public class Command : IRequest
        {
            public Allergy Allergy { get; set; }

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

                request.Allergy.patient = patient;

                request.Allergy.doctor = doctor;

                patient.Allergies.Add(request.Allergy);

                doctor.postingAllergies.Add(request.Allergy);

                _context.Allergies.Add(request.Allergy);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}

