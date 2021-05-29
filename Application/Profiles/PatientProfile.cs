using System;

namespace Application.Profiles
{
    public class PatientProfile
    {
        public string Id {get; set;}
       public string DisplayName {get;set;}

        public string UserName {get;set;}
        public string Name { get; set; }

        public string LastName {get; set;}

        public DateTime? BirthDate {get; set;}

        public string Address{get; set;}

        public string Language {get; set;}

        public string Profession { get; set; }
        
        public string Bio { get; set; }

        public string Image {get; set;}
    }
}