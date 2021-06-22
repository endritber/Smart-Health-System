using System;

namespace Domain
{
    public class LiverPanel
    {
        public Guid Id {get; set;}

        public float TotalBiliRubin { get; set; }
        public float DirectBiliRubin { get; set; }
        public float  SGOT{ get; set; }
        public float  SGPT{ get; set; }
        public float AlkalinePhosPhatase { get; set; }
        public DateTime Date  { get; set; }
        public Doctor doctor{get; set;}

        public Patient patient {get; set;}
    }
}