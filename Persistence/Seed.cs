using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.LabResults.Any())
            {
                var labresults = new List<LabResult>
                {
                    new LabResult
                    {
                        Problem = "HyperTension",
                        ProblemProportion = "2.67%"
                    },
                    new LabResult
                    {
                        Problem = "Depression",
                        ProblemProportion = "1.67%"
                    },
                     new LabResult
                    {
                        Problem = "Asthma",
                        ProblemProportion = "3.67%"
                    },
                 
                };
                if (!context.Prescriptions.Any())
            {
                var prescriptions= new List<Prescription>
                {
                    new Prescription
                    {
                        Medication = "Ibu Brufen",
                        Proportion = "1.00%"
                    },
                    new Prescription
                    {
                        Medication = "Aspirin",
                        Proportion = "2.22%"
                    },
                     new Prescription
                    {
                        Medication = "Albuterol",
                        Proportion = "1.632%"
                    },
                 
                };

                await context.LabResults.AddRangeAsync(labresults);
                await context.Prescriptions.AddRangeAsync(prescriptions);
                await context.SaveChangesAsync();
            }
        }
    }
    }
}