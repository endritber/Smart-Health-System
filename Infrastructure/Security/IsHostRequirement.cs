using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement

    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly HttpContextAccessor _httpContextAccessor;
        public IsHostRequirementHandler(DataContext dbContext, HttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(userId == null) return Task.CompletedTask;

            var patientId =Guid.Parse(_httpContextAccessor.HttpContext?.GetRouteValue("Id").ToString());

            var user = _dbContext.PatientInfos.FindAsync(userId, patientId).Result;

            if(user == null) return Task.CompletedTask;

            context.Succeed(requirement);

            return Task.CompletedTask;

        }
    }
}