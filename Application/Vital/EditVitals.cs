using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vital
{
    public class EditVitals
    {
           public class Command : IRequest
        {
            public Vitals Vital { get; set; }

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
                    var vital = await _context.Vitals.FindAsync(request.Vital.Id);

                    _mapper.Map(request.Vital, vital);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }

            
            }
        }
    }
}