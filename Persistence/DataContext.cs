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

        public DbSet<PatientInfo> PatientInfos { get; set; }
        
        


        protected override void OnModelCreating(ModelBuilder builder)
        {
          base.OnModelCreating(builder);

          builder.Entity<AppUser>(x=>x.HasKey(aa => new{aa.Id}));

          builder.Entity<AppUser>()
          .HasOne(u=>u.patient)
          .WithOne(a=>a.user)
          .HasForeignKey<PatientInfo>(aa=>aa.userId);


        }


    }
}