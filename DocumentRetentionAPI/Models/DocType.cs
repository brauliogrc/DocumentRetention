﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Models
{
    public class DocType
    {
        [Key]
        public int IDDT { get; set; }

        [Required]
        [MaxLength(80)]
        public string Name { get; set; }

        [Required]
        public DateTime UpdateAt { get; set; }

        [Required]
        public DateTime CreationAt { get; set; }


        // Relación 1:N con table "Documents"
        public List<Documents> document { get; set; }


        // Relación 1:N con tabala "Users"
        public long CreationUser { get; set; }
        public Users user { get; set; }
    }
}
