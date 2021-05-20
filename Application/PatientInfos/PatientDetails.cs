using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PatientInfos
{
    public class PatientDetails
    {
        public class Query : IRequest<PatientDto>
        {
            public Guid Id { get; set; }
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
                return await _context.PatientInfos
                .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x=>x.Id==request.Id);

            }
        }
    }
}