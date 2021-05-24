using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Doctors
{
    public class EditDoctor
    {
        public class Command : IRequest
        {
            public Doctor Doctor { get; set; }

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
                    var doctor = await _context.Doctors.FindAsync(request.Doctor.Id);

                    doctor.Name = request.Doctor.Name?? doctor.Name;
                    doctor.LastName = request.Doctor.LastName?? doctor.LastName;
                    doctor.Education = request.Doctor.Education?? doctor.Education;
                    doctor.Specialization = request.Doctor.Specialization?? doctor.Specialization;
                    doctor.Qualification = request.Doctor.Qualification?? doctor.Qualification;
                    doctor.YearsExperience = request.Doctor.YearsExperience?? doctor.YearsExperience;
                    doctor.BirthDate = request.Doctor.BirthDate?? doctor.BirthDate;
                    doctor.Gender = request.Doctor.Gender?? doctor.Gender;
                    
                    await _context.SaveChangesAsync();

                    return Unit.Value;
           
                }
            }
        }
    }
}
