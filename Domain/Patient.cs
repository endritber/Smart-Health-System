using System;
using System.Collections.Generic;

namespace Domain
{
    public class Patient : AppUser
    {
        public string Name { get; set; }

        public string LastName {get; set;}

        public DateTime? BirthDate {get; set;}

        public string Address{get; set;}

        public string Language {get; set;}

        public string Profession { get; set; }

        public string City { get; set; }

        public string Area { get; set; }
        
        public string Information {get; set;}

        public string Number {get;set;}

        public string BloodGroup {get; set;}

        public Doctor doctor {get; set;}

        public ICollection<Height> Height { get; set; } = new List<Height>();

        public ICollection<Weight> Weight { get; set; } = new List<Weight>();

        public ICollection<WaterIntake> WaterIntake { get; set; } = new List<WaterIntake>();

        public ICollection<Prescription> Prescriptions {get; set;} = new List<Prescription>();

        public ICollection<Allergy> Allergies {get; set;} = new List<Allergy>();

        public ICollection<Vitals> Vitals {get; set;} = new List<Vitals>();

         public ICollection<Appointment> Appointments {get; set;} = new List<Appointment>();

        public ICollection<CBC> CBCs {get; set;} = new List<CBC>();

        public ICollection<Urinalysis> UrinalysisList {get; set;} = new List<Urinalysis>();

        public ICollection<MetabolicPanel> MetabolicPanels {get; set;} = new List<MetabolicPanel>();

         public ICollection<LiverPanel> LiverPanels {get; set;} = new List<LiverPanel>();

         public ICollection<Symptoms> Symptoms {get; set;} = new List<Symptoms>();


    }
}