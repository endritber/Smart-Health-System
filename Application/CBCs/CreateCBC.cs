using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.CBCs
{
    public class CreateCBC {

        public class Command : IRequest
        {
            public CBC CBC { get; set; }

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

                request.CBC.patient = patient;

                request.CBC.doctor = doctor;

                patient.CBCs.Add(request.CBC);

                doctor.CBCsAdded.Add(request.CBC);

                _context.CBCs.Add(request.CBC);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
