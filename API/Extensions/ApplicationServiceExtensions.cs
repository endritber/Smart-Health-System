using Application.Core;
using Application.Doctors;
using Application.Interfaces;
using Application.LabResults;
using Application.Patients;
using Application.Prescriptions;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(ListLabResults.Handler).Assembly);
            services.AddMediatR(typeof(ListPrescriptions.Handler).Assembly);
            services.AddMediatR(typeof(ListDoctors.Handler).Assembly);
            services.AddMediatR(typeof(ListPatients.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddScoped<IUserAccessor, UserAccessor>();
            
            return services;
        }
    }
}