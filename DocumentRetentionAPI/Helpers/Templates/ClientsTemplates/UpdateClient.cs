using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers.Templates.ClientsTemplates
{
    public class UpdateClient
    {
        public int clientId { get; set; }

        public string? newName { get; set; }
    }
}
