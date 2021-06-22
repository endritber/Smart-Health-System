using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.CBCs
{
    public class EditCBC
    {
        public class Command : IRequest
        {
            public CBC CBC { get; set; }

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
                    var cbc = await _context.CBCs.FindAsync(request.CBC.Id);

                    _mapper.Map(request.CBC, cbc);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }
    }
}