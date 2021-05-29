using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class WaterIntake
    {
        [Key]
        public Guid waterId { get; set; }

        public int literPerHour { get; set; }
    }
}