using System;

namespace Domain
{
    public class Prescription
    {
        public Guid Id { get; set; }

        public string Medication { get; set; }

        public string Proportion {get; set;}
    }
}