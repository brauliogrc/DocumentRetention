using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;

namespace DocumentRetentionAPI.Controllers.RegisterControllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DRDBContext _context;

        public UsersController(DRDBContext context)
        {
            _context = context;
        }
    }
}
