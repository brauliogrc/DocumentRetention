using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Models
{
    public class Roles
    {
        [Key]
        public int IDRole { get; set; }

        [Required][MaxLength(20)]
        public string RoleName { get; set; }

        // Relación 1:N con tabla "Users"
        public List<Users> user { get; set; }
    }
}
