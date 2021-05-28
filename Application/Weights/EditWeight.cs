using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Weights
{
    public class EditWeight
    {
          public class Command : IRequest
        {
            public Weight Weight { get; set; }

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
                    var weight = await _context.Weights.FindAsync(request.Weight.weightId);

                    _mapper.Map(request.Weight, weight);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }

            
            }
        }
    }
}