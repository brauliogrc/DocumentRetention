using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Models
{
    public class Documents
    {
        [Key]
        public int IDDocument { get; set; }

        [Required]
        [MaxLength(80)]
        public string DocumentName { get; set; }

        [Required]
        [MaxLength(280)]
        public string DocumentPath { get; set; }

        public DateTime? DocumentStartDate { get; set; }

        public DateTime? DocumentDueDate { get; set; }

        [Required]
        public DateTime DocumentUpdateAt { get; set; }

        [Required]
        public DateTime DocumentCreationAt { get; set; }

        [MaxLength(30)]
        public string? DocumentVersion { get; set; }

        public string? DocumentComment { get; set; }

        [Required]
        public bool DocumentStatus { get; set; }


        // Relación 1:N con tabla "Processes"
        public int IDProcess { get; set; }
        public Processes process { get; set; }


        // Relación 1:N con tabala "Projects"
        public int IDProject { get; set; }
        public Projects project { get; set; }


        // Relación 1:N con tabla "DocType"
        public int IDDT { get; set; }
        public DocType docType { get; set; }


        // Relación 1:N con tabla "Users"
        public long CreationUser { get; set; }
        public Users user { get; set; }
    }
}
