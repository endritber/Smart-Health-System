using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.PatientInfos
{
    public class ListPatients
    {
        public class Query : IRequest<List<PatientDto>> { }

        public class Handler : IRequestHandler<Query, List<PatientDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<List<PatientDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                var patients = await _context.PatientInfos.ProjectTo<PatientDto>(_mapper.ConfigurationProvider).ToListAsync();
                
                return patients;
            }
        }
    }
}