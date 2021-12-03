using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers.Templates.ProcessesTemplates
{
    public class UpdateProcess
    {
        public int processId { get; set; }

        public string? newName { get; set; }

        public long? newOwnerNumber { get; set; }

        public string? newOwnerName { get; set; }

        public int? newStatus { get; set; }
    }
}
