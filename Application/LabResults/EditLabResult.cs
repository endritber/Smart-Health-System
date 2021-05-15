using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.LabResults
{
    public class EditLabResult
    {
        public class Command : IRequest
        {
            public LabResult LabResult { get; set; }

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
                    var labresult = await _context.LabResults.FindAsync(request.LabResult.Id);

                    _mapper.Map(request.LabResult, labresult);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }
    }
}