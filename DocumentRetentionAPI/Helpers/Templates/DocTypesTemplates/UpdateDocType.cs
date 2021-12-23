using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers.Templates.DocTypesTemplates
{
    public class UpdateDocType
    {
        public int docTypeId { get; set; }

        public string? newName { get; set; }
    }
}
