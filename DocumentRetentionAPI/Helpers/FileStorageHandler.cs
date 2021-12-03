using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DocumentRetentionAPI.Models;
using Microsoft.Extensions.Configuration;

namespace DocumentRetentionAPI.Helpers
{
    public class FileStorageHandler
    {

        private readonly DRDBContext _context;
        private readonly IConfiguration _conf;

        public FileStorageHandler(DRDBContext context, IConfiguration conf)
        {
            _context = context;
            _conf = conf;
        }

        public string[]? saveFiles(IFormFile doc, string version)
        {
            // Guardado del archivo adjunto
            var file = doc;
            //  var folderName = Path.Combine("Resources", "Request");
            var rutaPadre = Directory.GetParent(Directory.GetCurrentDirectory()).ToString();
        
            // string pathToSave = _conf.GetValue<string>("PathToSaveInProd");
            var pathToSave = Path.Combine(rutaPadre, "DocumentRetentionApp\\src\\assets\\Docs");    // desarrollo
            //var pathToSave = Path.Combine(rutaPadre, "DocumentRetentionApp\\assets\\Docs");      // producción

            string newPath;

            if (file != null)
            {
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    //  var dbPath = Path.Combine(folderName, fileName);

                    // cambiando el nombre al archivo
                    string extencion = Path.GetExtension(file.FileName).Substring(1);
                    string name = fileName.Split('.')[0];

                    // Definiendo el nuevo nombre del documento
                    string newName;
                    if (version == null) newName = name;
                    else
                    {
                        version = version.Replace(' ', '_');
                        newName = name + '_' + version;
                    }

                    // newPath = pathToSave + '\\' + fileName;
                    newPath = pathToSave + '\\' + newName + '.' + extencion;

                    if ( !this.validFileName( newName ) )
                    {
                        return null;
                    }

                    using (var fileStream = new FileStream(newPath, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }

                    // Console.WriteLine($"Full Path: {fullPath}\ndbPath: {dbPath}");
                    string[] pathAndName = { newPath, newName };
                    return pathAndName;
                }

                return null;
            }
            else
            {
                return null;
            }
        }

        // Busqueda del nombre en la DB para validar si ya se enceuntra registrado
        private bool validFileName(string fileName)
        {
            try
            {

                string name = (from doc in _context.Documents
                               where doc.DocumentName == fileName
                               select doc.DocumentName).FirstOrDefault();
                
                if ( name != null )
                {
                    Console.WriteLine(name);
                    return false;
                }

                return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        // Busqueda del nombre del proyecto para concatenarlo al nombre del documento       EN DESUSO
        private string getProjectName(string idProject)
        {
            try
            {
                var projectName = (from project in _context.Projects
                                    where project.IDProject == Convert.ToInt32(idProject)
                                    select project).FirstOrDefault();

                if (projectName == null) return "";

                return projectName.ProjectName.Replace(" ", "_");
            }
            catch(Exception ex)
            {
                return "";
            }
        }

        // Busqueda del nombre del proceso para concatenarlo al nombre del documento        EN DESUSO
        private string getProcessName(string idProcess)
        {
            try
            {
                var processName = (from process in _context.Processes
                                   where process.IDProcess == Convert.ToInt32(idProcess)
                                   select process).FirstOrDefault();

                if (processName == null) return "";

                return processName.ProcessName.Replace(" ", "_");
            }
            catch(Exception ex)
            {
                return "";
            }
        }
    }
}
