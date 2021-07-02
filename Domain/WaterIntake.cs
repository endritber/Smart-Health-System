using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class WaterIntake
    {
        
        public Guid waterintakeId { get; set; }

        public float literPerHour { get; set; }

        public Patient patient { get; set; }

         public DateTime date { get; set;}
    }
}