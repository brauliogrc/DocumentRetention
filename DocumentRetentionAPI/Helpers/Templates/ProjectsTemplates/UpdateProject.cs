using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers.Templates.ProjectsTemplates
{
    public class UpdateProject
    {
        public int projectId { get; set; }

        public string? newName { get; set; }

        public int? newStatus { get; set; }
    }
}
