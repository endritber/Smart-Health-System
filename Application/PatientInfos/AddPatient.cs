using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PatientInfos
{
    public class AddPatient
    {
        public class Command : IRequest
        {
            public PatientInfo PatientInfo { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }



            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var userUsername = await _context.Users.FirstOrDefaultAsync(x=> x.UserName==_userAccessor.GetUsername());
                
                
               var user = new PatientInfo
                {
                    Id=request.PatientInfo.Id,
                    Name=request.PatientInfo.Name,
                    LastName=request.PatientInfo.LastName,
                    Allergies=request.PatientInfo.Allergies,
                    Disease=request.PatientInfo.Disease,
                    Profession=request.PatientInfo.Profession,
                    BirthDate = request.PatientInfo.BirthDate,
                    Nationality = request.PatientInfo.Nationality,
                    user = userUsername,
                };


                _context.PatientInfos.Add(user);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}