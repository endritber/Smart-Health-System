using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Weights
{
    public class CreateWeight
    {
          public class Command : IRequest
        {
            public Weight Weight { get; set; }

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


                request.Weight.patient = patient;


                patient.Weight.Add(request.Weight);


                _context.Weights.Add(request.Weight);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}