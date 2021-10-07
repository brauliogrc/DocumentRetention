using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Helpers
{

    public class FilterTable {

        public int? docId { get; set; }

        public DateTime? dueDate { get; set; }

        public DateTime? startDate { get; set; }

        public int? selectedProject { get; set; }

        public int? selectedProcess { get; set; }

        public int? selectedDocType { get; set; }
    }


    public class DataTableHleper
    {
        // Datos del documentos
        public int IDDocument { get; set; }

        public string DocumentPath { get; set; }

        public string DocumentName { get; set; }

        public DateTime DocumentStartDate { get; set; }

        public DateTime DocumentDueDate { get; set; }

        // Datos del proceso
        public int IDProcess { get; set; }

        public string ProcessName { get; set; }

        //Datos del projecto
        public int IDProject { get; set; }

        public string ProjectName { get; set; }

        // Datos del usuario
        public string UID { get; set; }

        public string UserName { get; set; }

        // Datos del tipo de documento
        public int IDDT { get; set; }

        public string DTName { get; set; }
    }
}