using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Models;

namespace DocumentRetentionAPI.Helpers.ExistenceValidation
{
    public class ExistenceValidationHelper
    {
        private readonly DRDBContext _context;

        public ExistenceValidationHelper(DRDBContext context)
        {
            _context = context;
        }

        // Busca el usuario en la base de datos mediante su UID. true si el usuario existe, false si el usuario no existe
        public bool userExistence(string uid)
        {
            var users = (from user in _context.Users
                         where user.UID == uid
                         select user).FirstOrDefault();

            if (users != null) return true;

            return false;
        }

        // Busca el nombre del proceso. true si el proceso existe, false si el proceso no existe
        public bool processExistence(string name)
        {
            var processes = (from process in _context.Processes
                             where process.ProcessName.ToUpper() == name.ToUpper()
                             select process).FirstOrDefault();

            if (processes != null) return true;

            return false;
        }

        // Busca el nombre del cliente. true si el cliente existe, false si el cliente no existe
        public bool clientExistence(string name)
        {
            var clients = (from client in _context.Clients
                           where client.ClientName.ToUpper() == name.ToUpper()
                           select client).FirstOrDefault();

            if (clients != null) return true;

            return false;
        }

        // Busca el nombre del proyecto. true si el proyecto existe, false si el proyecto no existe
        public bool projectExistence(string name)
        {
            var projects = (from project in _context.Projects
                            where project.ProjectName.ToUpper() == name.ToUpper()
                            select project).FirstOrDefault();

            if (projects != null) return true;

            return false;
        }

        // Busca el nombre del tipo de documento. true si el tipo de documento existe, false si el tipo de documento no existe
        public bool docTypeExistence(string name)
        {
            var docType = (from dt in _context.DocType
                           where dt.DTName.ToUpper() == name.ToUpper()
                           select dt).FirstOrDefault();

            if (docType != null) return true;

            return false;
        }
    }
}
