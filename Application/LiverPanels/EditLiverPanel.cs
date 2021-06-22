using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.LiverPanels
{
    public class EditLiverPanel
    {
        public class Command : IRequest
        {
            public LiverPanel LiverPanel { get; set; }

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
                    var liverpanel = await _context.LiverPanels.FindAsync(request.LiverPanel.Id);

                    _mapper.Map(request.LiverPanel, liverpanel);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }
    }
}