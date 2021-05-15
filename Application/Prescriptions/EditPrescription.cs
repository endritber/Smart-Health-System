using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Prescriptions
{
    public class EditPrescription
    {
        public class Command : IRequest
        {
            public Prescription Prescription { get; set; }

            public class Handler : IRequestHandler<Command>
            {
                private readonly DataContext _context;
                private readonly IMapper _mapper;
                public Handler(DataContext context, IMapper mapper)
                {
                    _mapper = mapper;
                    _context = context;
                }

                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {
                    var prescription = await _context.Prescriptions.FindAsync(request.Prescription.Id);

                    _mapper.Map(request.Prescription, prescription);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }
    }
}