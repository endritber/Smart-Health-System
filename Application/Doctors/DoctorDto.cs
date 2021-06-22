using System;
using System.Collections.Generic;
using Application.Patients;
using Application.Profiles;
using Domain;

namespace Application.Doctors
{
    public class DoctorDto
    {

        public string Id {get; set;}
        public string Name {get; set;}

        public string LastName { get; set; }

        public string Education { get; set; }

        public int? YearsExperience {get; set;}

        public string Specialization { get; set; }

        public string Qualification { get; set; }

        public DateTime? BirthDate {get; set;}

        public string Gender {get; set;}  

        public ICollection<PatientProfile> Patients {get; set;} = new List<PatientProfile>();

        public ICollection<Prescription> Prescribed {get; set;} = new List<Prescription>();

        public ICollection<Allergy> postingAllergies {get; set;} = new List<Allergy>();

        public ICollection<Appointment> Appointments {get; set;} = new List<Appointment>();

          public ICollection<CBC> CBCsAdded {get; set;} = new List<CBC>();

        public ICollection<Urinalysis> UrinalysisListAdded {get; set;} = new List<Urinalysis>();

        public ICollection<MetabolicPanel> MetabolicPanelsAdded {get; set;} = new List<MetabolicPanel>();

         public ICollection<LiverPanel> LiverPanelsAdded {get; set;} = new List<LiverPanel>();

        
    }
}


