using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Step
{
    public class EditSteps
    {
               public class Command : IRequest
        {
            public Steps Step { get; set; }

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
                    var steps = await _context.Stepss.FindAsync(request.Step.stepsId);

                    _mapper.Map(request.Step, steps);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }

            
            }
        }
    }
}