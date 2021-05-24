using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Patients
{
    public class ListPatients
    {
        public class Query : IRequest<List<PatientDto>> {}

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
                var patients =  await _context.Patients
                .Include(a=>a.doctor)
                .ToListAsync(cancellationToken);

                var patientsToReturn = _mapper.Map<List<PatientDto>>(patients);

                return patientsToReturn;

            }
        }
    }
}