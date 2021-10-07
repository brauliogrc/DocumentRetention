using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Models
{
    public class Clients
    {
        [Key]
        public int IDClient { get; set; }

        [Required][MaxLength(80)]
        public string ClientName { get; set; }

        [Required]
        public DateTime ClientUpdateAt { get; set; }

        [Required]
        public DateTime ClientCreationAt { get; set; }


        // Relación 1:N con tabla "Projects"
        public List<Projects> project { get; set; }


        // Relación 1:N con tabla "Users"
        public long CreationUser { get; set; }
        public Users user { get; set; }
    }
}
