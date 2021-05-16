using System;

namespace Domain
{
    public class Prescription
    {
        public Guid Id { get; set; }

        public string Medication { get; set; }

        public string Dose { get; set; }

        public string Frequency { get; set; }

        public int Quantity { get; set; }

        public string Provider { get; set; }
        
        public DateTime Prescribed { get; set; }


    }
}