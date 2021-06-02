using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.WaterI
{
    public class CreateWaterI
    {   public class Command : IRequest
        {
            public WaterIntake WaterI { get; set; }

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


                request.WaterI.patient = patient;


                patient.WaterIntake.Add(request.WaterI);


                _context.WaterIntakes.Add(request.WaterI);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
        
    }
}