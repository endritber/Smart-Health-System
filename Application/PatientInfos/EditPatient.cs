using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.PatientInfos
{
    public class EditPatient
    {
        public class Command : IRequest
        {
            public PatientInfo PatientInfo { get; set; }

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
                    var patientinfo = await _context.PatientInfos.FindAsync(request.PatientInfo.Id);

                    _mapper.Map(request.PatientInfo, patientinfo);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
                }
            }
        }
    }
}