using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace DocumentRetentionAPI.Helpers.Interfaces
{
    public class UpdateDocument
    {
        // [Required(ErrorMessage = "This field is mandatory to identify the document to be modified")]
        [Required(ErrorMessage = "Este campo es necesario para identificar el documento a modificar")]
        public int idDoc { get; set; }

        public int? newStatus { get; set; }

        public long? newOwnerEmployeeNumber { get; set; }

        public int? newProcess { get; set; }

        public int? newProject { get; set; }

        public int? newDocType { get; set; }

        public string? newStartDate { get; set; }

        public string? newDueDate { get; set; }
    }
}
