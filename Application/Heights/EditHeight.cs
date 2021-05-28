using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Heights
{
    public class EditHeight
    {
         public class Command : IRequest
        {
            public Height Height { get; set; }

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
                    var height = await _context.Heights.FindAsync(request.Height.heightId);

                    _mapper.Map(request.Height, height);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }

            
            }
        }
    }
}