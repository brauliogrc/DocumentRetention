using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DocumentRetentionAPI.Helpers.AuthorizationPolicies
{
    public class CapturistAuthorization : IAuthorizationRequirement
    {
        public int adminRole { get; set; }

        public int capturistRole { get; set; }

        public CapturistAuthorization(int adminRole, int capturistRole)
        {
            this.adminRole = adminRole;
            this.capturistRole = capturistRole;
        }
    }

    public class CapturistAuthorizationPolicyHandler : AuthorizationHandler<CapturistAuthorization>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CapturistAuthorization requirement)
        {
            if ( !context.User.HasClaim( x => x.Type == "Role" ) )
            {
                return Task.CompletedTask;
            }

            int role = Convert.ToInt32( context.User.FindFirst( x => x.Type == "Role" ).Value );
            if ( role == requirement.adminRole || role == requirement.capturistRole )
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
