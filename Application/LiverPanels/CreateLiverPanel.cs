using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.LiverPanels
{
    public class CreateLiverPanel {

        public class Command : IRequest
        {
            public LiverPanel LiverPanel { get; set; }

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

                request.LiverPanel.patient = patient;

                request.LiverPanel.doctor = doctor;

                patient.LiverPanels.Add(request.LiverPanel);

                doctor.LiverPanelsAdded.Add(request.LiverPanel);

                _context.LiverPanels.Add(request.LiverPanel);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
