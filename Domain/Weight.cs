using System;

namespace Domain
{
    public class Weight
    {
        public Guid weightId { get; set; }

        public float myWeight { get; set; }

        public Patient patient { get; set; }

         public DateTime date { get; set;}
    }
}