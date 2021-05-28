using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Appointments
    {
        [Key]
        public Guid AppointmentId { get; set;}

        public Doctor doctorName { get; set;}

        public DateTime dateOfAppointment { get; set;}
    }
}