using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Models
{
    public class Users
    {

        [Key]
        public long IDUser { get; set; }

        [Required]
        [MaxLength(12)]
        public string UID { get; set; }

        [Required]
        [MaxLength(120)]
        public string UserName { get; set; }

        [Required]
        [MaxLength(120)]
        public string UserEmail { get; set; }

        [Required]
        public DateTime UserUpdateAt { get; set; }

        [Required]
        public DateTime UserCreationAt { get; set; }

        [Required]
        public bool UserStatus { get; set; }


        // Relación 1:N con tabla "Roles"
        [Required]
        public int IDRole { get; set; }
        public Roles role { get; set; }

        // Relación 1:N con tabla "Processes"
        public List<Processes> process { get; set; }


        // Relación 1:N con tabla "Clients"
        public List<Clients> client { get; set; }


        // Relación 1:N con tabla "Project"
        public List<Projects> project { get; set; }


        // Relación 1:N con tabla "DocType"
        public List<DocType> docType { get; set; }


        // Relación 1:N con tabla "Documents"
        public List<Documents> document { get; set; }
    }
}
