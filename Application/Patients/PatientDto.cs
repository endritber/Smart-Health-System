using System;
using System.Collections.Generic;
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

        public ICollection<LabResult> LabResults {get; set;} = new List<LabResult>();

        public ICollection<Prescription> Prescriptions {get; set;} = new List<Prescription>();

        public ICollection<Allergy> Allergies {get; set;} = new List<Allergy>();

    }
}
 