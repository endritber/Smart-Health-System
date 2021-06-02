using System;

namespace Domain
{
    public class Weight
    {
        public Guid weightId { get; set; }

        public double myWeight { get; set; }

        public Patient patient { get; set; }
    }
}