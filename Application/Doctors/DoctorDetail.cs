using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Doctors
{
    public class DoctorDetail
    {
        public class Query : IRequest<DoctorDto>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, DoctorDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<DoctorDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var doctor = await _context.Doctors
                .ProjectTo<DoctorDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x=>x.Id == request.Id);

                return doctor;

            }
        }
    }
}
