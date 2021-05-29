using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Patients
{
    public class AddDoctor
    {
         public class Command : IRequest
        {
           public string PatientId {get; set;}

           public string DoctorId {get; set;}
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

                    patient.doctor = doctor;

                    doctor.Patients.Add(patient);

                    await _context.SaveChangesAsync();
                    return Unit.Value;

                }
        }
    }
}