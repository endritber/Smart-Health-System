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

        public  override string PhoneNumber {get; set;} 

        public string Language {get; set;}

        public string Profession { get; set; }

        public Doctor doctor {get; set;}

        public ICollection<LabResult> LabResults {get; set;} = new List<LabResult>();

        public ICollection<Height> Height { get; set; } = new List<Height>();

        public ICollection<Weight> Weight { get; set; } = new List<Weight>();

        public ICollection<WaterIntake> WaterIntake { get; set; } = new List<WaterIntake>();

        public ICollection<Prescription> Prescriptions {get; set;} = new List<Prescription>();

        public ICollection<Allergy> Allergies {get; set;} = new List<Allergy>();

        public ICollection<Vitals> Vitals {get; set;} = new List<Vitals>();

    }
}