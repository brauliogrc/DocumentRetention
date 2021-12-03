using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Models;

namespace DocumentRetentionAPI.Helpers.Templates.ProcessesTemplates
{
    public class NewProcess
    {
        public string name { get; set; }

        public long ownerNumber { get; set; }

        public string ownerName { get; set; }

        public long creationUser { get; set; }
    }
}
