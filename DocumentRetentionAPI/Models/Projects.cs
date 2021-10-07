using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Models
{
    public class Projects
    {
        [Key]
        public int IDProject { get; set; }

        [Required][MaxLength(80)]
        public string ProjectName { get; set; }

        [Required]
        public DateTime ProjecUpdateAt { get; set; }

        [Required]
        public DateTime ProjectCreationAt { get; set; }

        [Required]
        public bool ProjectStatus { get; set; }


        // Relación 1:N con tabla "Documents"
        public List<Documents> document { get; set; }


        // Relación 1:N con tabala "Clients"
        public int IDClient { get; set; }
        public Clients client { get; set; }


        // Relación 1:N con tabla "Users"
        public long CreationUser { get; set; }
        public Users user { get; set; }
    }
}
