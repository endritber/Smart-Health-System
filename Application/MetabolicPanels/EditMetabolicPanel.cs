using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.MetabolicPanels
{
    public class EditMetabolicPanel
    {
        public class Command : IRequest
        {
            public MetabolicPanel MetabolicPanel { get; set; }

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
                    var metabolicpanel = await _context.MetabolicPanels.FindAsync(request.MetabolicPanel.Id);

                    _mapper.Map(request.MetabolicPanel, metabolicpanel);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }
    }
}