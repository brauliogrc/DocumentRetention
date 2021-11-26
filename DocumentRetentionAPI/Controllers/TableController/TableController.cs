using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Net.Http.Headers;
using DocumentRetentionAPI.Helpers;

namespace DocumentRetentionAPI.Controllers.FieldsControler
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly DRDBContext _context;

        public TableController(DRDBContext context)
        {
            _context = context;
        }

        // Obención de los documentos existentes en la base de datos para ser mostrados en la tabla del
        // componente "Doc-Viewer". Visualización del Admin
        [HttpGet] [Route("adminTable")] [Authorize(Policy = "Adm")] //[AllowAnonymous]
        public async Task<ActionResult> adminTable()
        {
            try
            {
                var adminDocs = from doc in _context.Documents
                                join process in _context.Processes
                                    on doc.IDProcess equals process.IDProcess
                                join projetc in _context.Projects
                                    on doc.IDProject equals projetc.IDProject
                                join client in _context.Clients
                                    on projetc.IDClient equals client.IDClient
                                join docType in _context.DocType
                                    on doc.IDDT equals docType.IDDT
                                join user in _context.Users
                                    on doc.CreationUser equals user.IDUser
                                select new
                                {
                                    // Datos del documento
                                    doc.IDDocument,
                                    doc.DocumentPath,
                                    doc.DocumentName,
                                    doc.DocumentStartDate,
                                    doc.DocumentDueDate,
                                    doc.ownerName,
                                    doc.DocumentStatus,
                                    doc.DocumentUpdateAt,
                                    doc.DocumentComment,
                                    // Datos del proceso
                                    process.IDProcess,
                                    process.ProcessName,
                                    // Datos del projecto
                                    projetc.IDProject,
                                    projetc.ProjectName,
                                    // Datos del cleinte
                                    client.IDClient,
                                    client.ClientName,
                                    // Datos del usuario
                                    user.UID,
                                    user.UserName,
                                    // Datos del tipo de documento
                                    docType.IDDT,
                                    docType.DTName
                                };

                if (adminDocs == null || adminDocs.Count() == 0)
                {
                    return NotFound(new { message = $"No se ha encontrado nigún documento" });
                }

                return Ok(adminDocs);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener la lista de documentos. ERROR: {ex.Message}" });
            }
        }

        // Obención de los documentos existentes en la base de datos para ser mostrados en la tabla del
        // componente "Doc-Viewer". Visualización de cualquier usuario
        [HttpGet] [Route("userTable")] [AllowAnonymous]
        public async Task<ActionResult> userTable()
        {
            try
            {
                var adminDocs = from doc in _context.Documents
                                join process in _context.Processes
                                    on doc.IDProcess equals process.IDProcess
                                join projetc in _context.Projects
                                    on doc.IDProject equals projetc.IDProject
                                join client in _context.Clients
                                    on projetc.IDClient equals client.IDClient
                                join docType in _context.DocType
                                    on doc.IDDT equals docType.IDDT
                                join user in _context.Users
                                    on doc.CreationUser equals user.IDUser
                                where doc.DocumentStatus == true
                                select new
                                {
                                    // Datos del documento
                                    doc.IDDocument,
                                    doc.DocumentName,
                                    doc.DocumentStartDate,
                                    doc.DocumentDueDate,
                                    doc.ownerName,
                                    // Datos del proceso
                                    process.IDProcess,
                                    process.ProcessName,
                                    // Datos del projecto
                                    projetc.IDProject,
                                    projetc.ProjectName,
                                    // Datos del cleinte
                                    client.IDClient,
                                    client.ClientName,
                                    // Datos del usuario
                                    // user.UID,
                                    // user.UserName,
                                    // Datos del tipo de documento
                                    docType.IDDT,
                                    docType.DTName
                                };

                if (adminDocs == null || adminDocs.Count() == 0)
                {
                    return NotFound(new { message = $"No se ha encontrado nigún documento" });
                }

                return Ok(adminDocs);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener la lista de documentos. ERROR: {ex.Message}" });
            }
        }

        /*[HttpGet][Route("adminGetDocs")][Authorize(Policy = "Adm")]
        private async Task<ActionResult> adminGetDocs()
        {
            try
            {
                var adminDocs = from doc in _context.Documents
                                join process in _context.Processes
                                    on doc.IDProcess equals process.IDProcess
                                join projetc in _context.Projects
                                    on doc.IDProject equals projetc.IDProject
                                join docType in _context.DocType
                                    on doc.IDDT equals docType.IDDT
                                join user in _context.Users
                                    on doc.CreationUser equals user.IDUser
                                select new { 
                                    // Datos del documento
                                    doc.IDDocument,
                                    doc.DocumentName,
                                    doc.DocumentStartDate,
                                    doc.DocumentDueDate,
                                    // Datos del proceso
                                    process.IDProcess,
                                    process.ProcessName,
                                    // Datos del projecto
                                    projetc.IDProject,
                                    projetc.ProjectName,
                                    // Datos del usuario
                                    user.UID,
                                    user.UserName,
                                    // Datos del tipo de documento
                                    docType.IDDT,
                                    docType.DTName
                                };

                if ( adminDocs == null || adminDocs.Count() == 0)
                {
                    return NotFound(new { message = $"No se ha encontrado nigún documento" });
                }

                return Ok(adminDocs);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener la lista de documentos"});
            }
            return Ok();
        }*/

        [HttpGet] [Route("getUsersList")] [Authorize(Policy = "Adm")]
        public async Task<ActionResult> getUsersList()
        {
            try
            {
                var usersList = from user in _context.Users
                                join role in _context.Roles
                                    on user.IDRole equals role.IDRole
                                select new
                                {
                                    user.IDUser,
                                    user.UID,
                                    user.UserName,
                                    user.UserEmail,
                                    user.UserStatus,
                                    role.IDRole,
                                    role.RoleName
                                };

                if (usersList == null || usersList.Count() == 0)
                {
                    return NotFound(new { message = $"No se encuentra ningún usuario registrado" });
                }

                return Ok(usersList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener la lista del usuarios. ERROR: {ex.Message}" });
            }
        }
    }
}
