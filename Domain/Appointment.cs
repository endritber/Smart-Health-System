using System;

namespace Domain 

{
    public class Appointment
    {

        public Guid Id {get; set;}

        public DateTime Date { get; set;}

        public String ReasonOfVisit { get; set;}

        public String Place { get; set;}

        public Patient patient {get; set;}

        public Doctor doctor {get; set;} 
    }
    
}