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

        public ICollection<Prescription> Prescriptions {get; set;} = new List<Prescription>();

        public ICollection<Allergy> Allergies {get; set;} = new List<Allergy>();
        public ICollection<Appointment> Appointments {get; set;} = new List<Appointment>();

           public ICollection<CBC> CBCs {get; set;} = new List<CBC>();

        public ICollection<Urinalysis> UrinalysisList {get; set;} = new List<Urinalysis>();

        public ICollection<MetabolicPanel> MetabolicPanels {get; set;} = new List<MetabolicPanel>();

         public ICollection<LiverPanel> LiverPanels {get; set;} = new List<LiverPanel>();
         public ICollection<Symptoms> Symptoms {get; set;} = new List<Symptoms>();

         public ICollection<Weight> Weight {get; set;} = new List<Weight>();



    }
}
 