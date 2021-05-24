using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
       public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)

{

       
                var users = new List<AppUser> 
                {
                    new Doctor {DisplayName="Doctor", Email="doctor@test.com",UserName="doctor", RoleId=2},
                    new Doctor {DisplayName="Doctor2", Email="doctor2@test.com",UserName="doctor2", RoleId=2},
                    new Patient {DisplayName="Endrit", Email="endrit@test.com",UserName="endrit", RoleId=1, }

                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            


            if (!context.LabResults.Any())
            {
                var labresults = new List<LabResult>
                {
                    new LabResult
                    {
                        Sample = "HyperTension",
                        ProblemProportion = ".67%",
                        Date= DateTime.Now.AddMonths(0),
                        Result = "Hematocrit",
                        ResultProportion="4.32%",
                        status = "True"

                    },
                    new LabResult
                    {
                        Sample = "Depression",
                        ProblemProportion = "3.67%",
                        Date= DateTime.Now.AddMonths(0),
                        Result = "Pottasium",
                        ResultProportion="4.32%",
                        status = "False"

                    },
                    new LabResult
                    {
                        Sample = "Asthma",
                        ProblemProportion = "2.67%",
                        Date= DateTime.Now.AddMonths(-2),
                        Result = "Hemoglobin",
                        ResultProportion="4.32%",
                        status = "True"

                    },
                             new LabResult
                    {
                        Sample = "Breast Cancer",
                        ProblemProportion = "3.64%",
                        Date= DateTime.Now.AddMonths(-1),
                        Result = "Platelets",
                        ResultProportion="4.32%",
                        status = "False"

                    },
                             new LabResult
                    {
                        Sample = "HyperLipidemia",
                        ProblemProportion = "2.67%",
                        Date= DateTime.Now.AddMonths(-1),
                        Result = "Hemoglobin",
                        ResultProportion="4.32%",
                        status = "False"

                    },
                 
                };
                if (!context.Prescriptions.Any())
            {
                var prescriptions= new List<Prescription>
                {
                    new Prescription
                    {
                        Medication = "Ibu Brufen",
                        Dose = "3.2%",
                        Frequency="1 daily",
                        Quantity="2",
                        Provider = "Barnes",
                        Prescribed = DateTime.Now.AddMonths(0)
                    },
                          new Prescription
                    {
                        Medication = "Aspirin",
                        Dose = "2.53%",
                        Frequency="2 daily",
                        Quantity="3",
                        Provider = "OTC",
                        Prescribed = DateTime.Now.AddMonths(0)
                    },
                          new Prescription
                    {
                        Medication = "Albuterol",
                        Dose = "2.46%",
                        Frequency="2 daily",
                        Quantity="1",
                        Provider = "OTC",
                        Prescribed = DateTime.Now.AddMonths(0)
                    },
                          new Prescription
                    {
                        Medication = "Gabapentin",
                        Dose = "0.23%",
                        Frequency="1 daily",
                        Quantity="2",
                        Provider = "OTC",
                        Prescribed = DateTime.Now.AddMonths(0)
                    },
                    new Prescription{
                        Medication = "Citalopran",
                        Dose = "0.93%",
                        Frequency="2 daily",
                        Quantity="4",
                        Provider = "Barnes",
                        Prescribed = DateTime.Now.AddMonths(0)
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