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
    }
}
