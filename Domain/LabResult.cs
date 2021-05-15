using System;

namespace Domain
{
    public class LabResult
    {
        public Guid Id { get; set; }

        public string Problem { get; set; }

        public string ProblemProportion { get; set; }

        public string Result { get; set; }

        public string ResultProportion { get; set; }

    }
}