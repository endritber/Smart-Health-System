using System.Linq;
using Application.PatientInfos;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<LabResult, LabResult>();
            CreateMap<Prescription, Prescription>();
            CreateMap<PatientInfo, PatientDto>()
            .ForMember(a=>a.HostUser, o=>o.MapFrom(x=>x.user.UserName));

            CreateMap<AppUser, PatientProfile>()
            .ForMember(a=>a.UserName, o=>o.MapFrom(x=>x.UserName))
            .ForMember(a=>a.DisplayName, o=>o.MapFrom(x=>x.DisplayName))
            .ForMember(a=>a.RoleId, o=>o.MapFrom(x=>x.RoleId))
            .ForMember(a=>a.Bio, o=>o.MapFrom(x=>x.Bio));

        }
    }
}