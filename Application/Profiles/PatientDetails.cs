using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class PatientDetails
    {
        public class Query : IRequest<PatientProfile> { 

            public string UserName {get;set;}
        }

        public class Handler : IRequestHandler<Query, PatientProfile>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<PatientProfile> Handle(Query request, CancellationToken cancellationToken)

            {
                var patient = await _context.Patients
                .ProjectTo<PatientProfile>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x=>x.UserName == request.UserName);

                return patient;
 
            }
        }
    }
}