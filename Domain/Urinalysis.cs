using System;

namespace Domain
{
    public class Urinalysis
    {

        public Guid Id{get; set;}
        public float Sodium { get; set; }

        public float  Potassium{ get; set; }
        public float Chloride { get; set; }
        public float  HCO3{ get; set; }
        public float Creatinine { get; set; }
        public float  BloodUreaNitrogen{ get; set; }
        public float FastingGlucose { get; set; }
        public float  Calcium{ get; set; }
        public float  Magnesium{ get; set; }
        public float  Phosphate{ get; set; }

        public DateTime  Date{ get; set; }

        public Doctor doctor{get; set;}
        public Patient patient{get; set;}
    }
}