using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers.Interfaces.UsersInterfaces
{
    public class NewUser
    {
        public string UID { get; set; }

        public string name { get; set; }

        public string email { get; set; }

        public int role { get; set; }
    }
}
