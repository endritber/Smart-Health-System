using System;

namespace Domain
{
    public class Allergy
    {
        public Guid Id { get; set; }

        public string Info { get; set; }

        public string Causes { get; set; }

        public string Treatments { get; set; }

        public string NaturalRemedies { get; set; }

        public string CommonFoodTriggers { get; set; }

        public Patient patient { get; set; }

        public Doctor doctor {get; set; }

    }
}