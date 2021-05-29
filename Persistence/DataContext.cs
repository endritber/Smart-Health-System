using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public partial class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<LabResult> LabResults { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // builder.Entity<DoctorPatient> (x=>x.HasKey( xx=> new {xx.DoctorId, xx.PatientId}));

            builder.Entity<Doctor>()
            .HasMany(x=>x.Patients)
            .WithOne(x=>x.doctor);

        
        }

    }
}