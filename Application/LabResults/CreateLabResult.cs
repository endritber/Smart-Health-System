using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.LabResults
{
    public class CreateLabResult {

        public class Command : IRequest
        {
            public LabResult LabResult { get; set; }

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

                request.LabResult.patient = patient;

                request.LabResult.doctor = doctor;

                patient.LabResults.Add(request.LabResult);

                doctor.PostingResults.Add(request.LabResult);

                _context.LabResults.Add(request.LabResult);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
