using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        protected DataContext(DbContextOptions options) : base(options)
        {

        }
    }
}