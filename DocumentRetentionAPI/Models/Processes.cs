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
        public int IDProcesses { get; set; }

        [Required][MaxLength(80)]
        public string Name { get; set; }

        [Required]
        public DateTime UpdaeAt { get; set; }

        [Required]
        public DateTime CreationAt { get; set; }

        [Required]
        public long IDOwner { get; set; }

        [Required][MaxLength(120)]
        public string NameOwner { get; set; }

        [Required]
        public bool Status { get; set; }


        // Relación 1:N con tabla "Documents"
        public List<Documents> document { get; set; }


        // Relación 1:N con tabla "Users"
        [Required]
        public long CreationUser { get; set; }
        public Users user { get; set; }
    }
}
