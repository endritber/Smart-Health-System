using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Doctors
{
    public class ListDoctors
    {
        public class Query : IRequest<List<DoctorDto>> { }

        public class Handler : IRequestHandler<Query, List<DoctorDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<List<DoctorDto>> Handle(Query request, CancellationToken cancellationToken)

            {
                var doctors = await _context.Doctors
                .Include(a => a.Patients)
                .ToListAsync(cancellationToken);
                

                var doctorsToReturn = _mapper.Map<List<DoctorDto>>(doctors);

                return doctorsToReturn;
 
            }
        }
    }
}