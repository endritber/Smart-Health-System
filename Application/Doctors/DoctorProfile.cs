using System;

namespace Application.Profiles
{
    public class DoctorProfile
    {
        public string Id { get; set; }
        public string DisplayName {get;set;}

        public string UserName {get;set;}
        public string Name {get; set;}

        public string LastName { get; set; }

        public string Education { get; set; }

        public int? YearsExperience {get; set;}

        public string Specialization { get; set; }

        public string Qualification { get; set; }

        public DateTime? BirthDate {get; set;}

        public string Gender {get; set;} 

        public string Bio {get; set;}

        public string Image {get; set;}
    }
}