using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DocumentRetentionAPI.Helpers.AuthorizationPolicies
{
    public class AdminAuthorization : IAuthorizationRequirement
    {
        public int adminRole { get; set; }

        public AdminAuthorization(int adminRole)
        {
            this.adminRole = adminRole;
        }
    }

    public class AdminAuthorizationPolicyHandler : AuthorizationHandler<AdminAuthorization>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminAuthorization requirement)
        {
            if ( !context.User.HasClaim( x => x.Type == "Role" ) )
            {
                return Task.CompletedTask;
            }

            int role = Convert.ToInt32( context.User.FindFirst( x => x.Type == "Role" ).Value );
            if ( role == requirement.adminRole )
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
