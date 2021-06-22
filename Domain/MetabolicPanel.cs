using System;

namespace Domain
{
    public class MetabolicPanel
    {
        public Guid Id { get; set; }

        public float Glucose { get; set; }

        public float  Bun{ get; set; }
        public float  Protein { get; set; }
        public float Albumin { get; set; }
        public float  Calcium{ get; set; }
        public float  Globulin{ get; set; }
        public float  CarbonDioxide{ get; set; }
        public DateTime date  { get; set; }

        public Doctor doctor{get; set;}

        public Patient patient {get; set;}

    }
}