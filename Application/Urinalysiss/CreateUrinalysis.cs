using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Urinalysiss
{
    public class CreateUrinalysis {

        public class Command : IRequest
        {
            public Urinalysis Urinalysis { get; set; }

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

                request.Urinalysis.patient = patient;

                request.Urinalysis.doctor = doctor;

                patient.UrinalysisList.Add(request.Urinalysis);

                doctor.UrinalysisListAdded.Add(request.Urinalysis);

                _context.UrinalysisList.Add(request.Urinalysis);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
