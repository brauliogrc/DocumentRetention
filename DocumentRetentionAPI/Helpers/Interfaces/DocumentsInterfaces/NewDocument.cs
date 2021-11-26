using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers
{
    public class NewDocument
    {
        public long ownerEmployeeNumber { get; set; }

        public string docType { get; set; }

        public string dueDate { get; set; }

        public string process { get; set; }

        public string project { get; set; }

        public string? version { get; set; }

        public string startDate { get; set; }

        public string creationUser { get; set; }

        public IFormFile file { get; set; }
    }
}
