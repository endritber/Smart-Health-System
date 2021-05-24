using System;
using Application.Doctors;
using Application.Profiles;
using Domain;

namespace Application.Patients
{
    public class PatientDto
    {
        public string Id {get;set;}
        public string Name { get; set; }

        public string LastName {get; set;}

        public DateTime? BirthDate {get; set;}

        public string Address{get; set;}

        public string Language {get; set;}

        public string Profession { get; set; }

        public DoctorProfile doctor {get; set;}

    }
}
 