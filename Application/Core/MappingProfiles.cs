using System.Linq;
using Application.Doctors;
using Application.Patients;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            
            CreateMap<Prescription, Prescription>();
            CreateMap<Allergy, Allergy>();
            CreateMap<Urinalysis, Urinalysis>();
            CreateMap<CBC, CBC>();
            CreateMap<LiverPanel, LiverPanel>();
            CreateMap<MetabolicPanel, MetabolicPanel>();

            CreateMap<Doctor, DoctorDto>();
            CreateMap<Doctor, DoctorProfile>();
            CreateMap<Patient, PatientDto>();
            CreateMap<Patient, PatientProfile>();

            




            
        }
    }
}