using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers.Templates.ProjectsTemplates
{
    public class NewProject
    {
        public string name { get; set; }

        public int client { get; set; }

        public long creationUser { get; set; }
    }
}
