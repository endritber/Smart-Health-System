using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Heights
{
    public class CreateHeight
    {
         public class Command : IRequest
        {
            public Height Height { get; set; }

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


                request.Height.patient = patient;


                patient.Height.Add(request.Height);


                _context.Heights.Add(request.Height);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}