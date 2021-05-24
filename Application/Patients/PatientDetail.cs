using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Patients
{
    public class PatientDetail
    {
        public class Query : IRequest<PatientDto>
        {
            public String Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, PatientDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<PatientDto> Handle(Query request, CancellationToken cancellationToken)
            {
            var patient = await _context.Patients
            .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x=>x.Id == request.Id);

            return patient;

            }
        }
    }
}
