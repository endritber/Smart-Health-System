using System;

namespace Domain
{
    public class LabResult
    {
        public Guid Id { get; set; }

        public string Sample { get; set; }

        public string ProblemProportion { get; set; }

        public DateTime Date {get; set;}

        public string Result { get; set; }

        public string ResultProportion { get; set; }

        public int status {get; set;}

    }
}