using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Allergies
{
    public class EditAllergy
    {
        public class Command : IRequest
        {
            public Allergy Allergy { get; set; }

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
                    var allergy = await _context.Allergies.FindAsync(request.Allergy.Id);

                    _mapper.Map(request.Allergy, allergy);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }
    }
}