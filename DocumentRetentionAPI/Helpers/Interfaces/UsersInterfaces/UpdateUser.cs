using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers.Interfaces.UsersInterfaces
{
    public class UpdateUser
    {
        public long userId { get; set; }

        public string? newEmail { get; set; }

        public int? newStatus { get; set; }

        public int? newRole { get; set; }
    }
}
