using System;

namespace Domain
{
    public class CBC
    {
        public Guid Id { get; set; }

        public float WBC { get; set; }
        public float SegmentedNeutrofilis  { get; set; }
        public float BandForms { get; set; }
        public float Lymphocytes { get; set; }
        public float  Monocytes{ get; set; }
        public float Basoghilis { get; set; }
        public float  Hemoglobin{ get; set; }
        public float Hematocrit { get; set; }
        public float  PlateletCount { get; set; }

        public DateTime Date {get;set;}

            public Doctor doctor{get; set;}

        public Patient patient {get; set;}
    }
}