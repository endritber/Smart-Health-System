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


    }
}