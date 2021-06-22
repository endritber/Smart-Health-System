using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.MetabolicPanels
{
    public class CreateMetabolicPanel {

        public class Command : IRequest
        {
            public MetabolicPanel MetabolicPanel { get; set; }

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

                request.MetabolicPanel.patient = patient;

                request.MetabolicPanel.doctor = doctor;

                patient.MetabolicPanels.Add(request.MetabolicPanel);

                doctor.MetabolicPanelsAdded.Add(request.MetabolicPanel);

                _context.MetabolicPanels.Add(request.MetabolicPanel);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
