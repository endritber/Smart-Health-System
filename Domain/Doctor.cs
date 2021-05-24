using System;
using System.Collections.Generic;

namespace Domain
{
    public class Doctor : AppUser
    {
        public string Name {get; set;}

        public string LastName { get; set; }

        public string Education { get; set; }

        public int? YearsExperience {get; set;}

        public string Specialization { get; set; }

        public string Qualification { get; set; }

        public DateTime? BirthDate {get; set;}

        public string Gender {get; set;}  

        public ICollection<Patient> Patients {get; set;} = new List<Patient>();
        
    }
}

