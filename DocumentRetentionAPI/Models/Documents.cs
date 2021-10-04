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
        public string Name { get; set; }

        [Required]
        [MaxLength(20)]
        public string Path { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? DueDate { get; set; }

        [Required]
        public DateTime UpdateAt { get; set; }

        [Required]
        public DateTime CreationAt { get; set; }

        [Required]
        public bool Status { get; set; }


        // Relación 1:N con tabla "Processes"
        public int IDProcesses { get; set; }
        public Processes process { get; set; }


        // Relación 1:N con tabala "Projects"
        public int IDProjects { get; set; }
        public Projects project { get; set; }


        // Relación 1:N con tabla "DocType"
        public int IDDT { get; set; }
        public DocType docType { get; set; }


        // Relación 1:N con tabla "Users"
        public long CreationUser { get; set; }
        public Users user { get; set; }
    }
}
