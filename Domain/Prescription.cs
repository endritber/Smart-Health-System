using System;

namespace Domain
{
    public class Prescription
    {
        public Guid Id { get; set; }

        public string Medication { get; set; }

        public string Dose { get; set; }

        public string Frequency { get; set; }

        public string Quantity { get; set; }

        public string Provider { get; set; }
        
        public DateTime Prescribed { get; set; }


        public Patient patient { get;set;}

        public Doctor doctor {get; set;}


    }
}