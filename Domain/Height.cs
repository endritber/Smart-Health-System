using System;

namespace Domain
{
    public class Height
    {
        public Guid heightId { get; set; }

        public float myHeight { get; set; }
        public Patient patient { get; set; }

        public DateTime date { get; set;}
    }
}