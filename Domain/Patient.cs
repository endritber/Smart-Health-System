using System;

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

    }
}