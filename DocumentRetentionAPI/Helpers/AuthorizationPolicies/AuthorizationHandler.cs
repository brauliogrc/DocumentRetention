using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DocumentRetentionAPI.Helpers
{
    public class AuthorizationHandler
    {

    }

    public class AceptedRoles : IAuthorizationRequirement
    {
        public int rolAdmin { get; set; }

        public int rolCapturist { get; set; }

        public AceptedRoles(int rolAdmin, int rolCapturist)
        {
            this.rolAdmin = rolAdmin;
            this.rolCapturist = rolCapturist;
        }
    }

    public class AceptedRolesHandler : AuthorizationHandler<AceptedRoles>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AceptedRoles requirement)
        {
            // var authorizationFilterContext = context.Resource as AuthorizationFilterContext;
            //Validación del claim de administrador
            if (!context.User.HasClaim(x => x.Type == "Role"))
            {
                // authorizationFilterContext.Result = new RedirectToActionResult()
                return Task.CompletedTask;
            }

            int role = Convert.ToInt32(context.User.FindFirst(x => x.Type == "Role").Value);
            if (role == requirement.rolAdmin || role == requirement.rolCapturist )
            {
                context.Succeed(requirement);
            }

            // throw new NotImplementedException();
            return Task.CompletedTask;
        }
    }
}
