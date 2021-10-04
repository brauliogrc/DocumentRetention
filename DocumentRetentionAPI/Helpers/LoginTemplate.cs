using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers
{
    public class LoginTemplate
    {
        [Required(ErrorMessage = "UID is required")]
        public string UID { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Pass { get; set; }
    }

    public class AuthUser
    {
        public long IDUser { get; set; }
        public string UID { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public int IDRole { get; set; }
    }
}
