using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Models
{
    public class Processes
    {
        [Key]
        public int IDProcess { get; set; }

        [Required][MaxLength(80)]
        public string ProcessName { get; set; }

        [Required]
        public DateTime ProcessUpdaeAt { get; set; }

        [Required]
        public DateTime ProcessCreationAt { get; set; }

        [Required]
        public long IDOwner { get; set; }

        [Required][MaxLength(120)]
        public string NameOwner { get; set; }

        [Required]
        public bool ProcessStatus { get; set; }


        // Relación 1:N con tabla "Documents"
        public List<Documents> document { get; set; }


        // Relación 1:N con tabla "Users"
        [Required]
        public long CreationUser { get; set; }
        public Users user { get; set; }
    }
}
