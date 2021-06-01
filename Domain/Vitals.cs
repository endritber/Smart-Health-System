using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Vitals
    {
        [Key]
        public Guid Id { get; set; }
        public int heartRate { get; set; }

        public double bodyTemperature { get; set; }

        public double bloodPressure { get; set; }
    }
}