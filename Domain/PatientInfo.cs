using System;

namespace Domain
{
    public class PatientInfo
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public DateTime BirthDate {get; set;}

        public string LastName { get; set; }

        public string Nationality { get; set; }

        public string Allergies {get; set;}

        public string Profession {get; set;}
        public string Disease {get; set;}
        public string userId { get; set; } 
        public AppUser user {get; set;} = new AppUser();

    }
}