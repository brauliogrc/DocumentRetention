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
        [HttpGet]
        [Route("adminTable")]
        [Authorize(Policy = "Adm")]
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
                                    doc.DocumentStatus,
                                    doc.DocumentUpdateAt,
                                    doc.DocumentComment,
                                    doc.DocumentVersion,
                                    // Datos del proceso
                                    process.IDProcess,
                                    process.ProcessName,
                                    process.NameOwner,
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
        // componente "Doc-Viewer". Visualización de cualquier usuario y del usuario con rol de capturista
        [HttpGet]
        [Route("userTable")]
        [AllowAnonymous]
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
                                    doc.DocumentUpdateAt,
                                    doc.DocumentVersion,
                                    // Datos del proceso
                                    process.IDProcess,
                                    process.ProcessName,
                                    process.NameOwner,
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

        // Obtención de la lista de usuarios registrados en la DB
        [HttpGet]
        [Route("getUsersList")]
        [Authorize(Policy = "Adm")]
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

        // Obtención de la lista de procesos registrados en la DB
        [HttpGet]
        [Route("getProcessesList")]
        [Authorize(Policy = "Adm")]
        public async Task<ActionResult> gerProcessesList()
        {
            try
            {

                var processesList = from process in _context.Processes
                                    join user in _context.Users
                                        on process.CreationUser equals user.IDUser
                                    select new
                                    {
                                        process.IDProcess,
                                        process.ProcessName,
                                        process.IDOwner,
                                        process.NameOwner,
                                        process.ProcessCreationAt,
                                        process.ProcessStatus,
                                        process.ProcessUpdaeAt,
                                        user.UID,
                                        user.UserName,
                                    };

                if (processesList == null || processesList.Count() == 0) return NotFound( new { message = $"No se ha encontrado nungún proceso registrado" } );


                return Ok( processesList );
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener la lista de procesos. ERROR: { ex.Message }" });
            }
        }

        // Obtención de la lista de projectos registrados
        [HttpGet]
        [Route("getProjectList")]
        [Authorize(Policy = "Adm")]
        public async Task<ActionResult> getProjectList()
        {
            try
            {
                var projectList = from project in _context.Projects
                                  join client in _context.Clients
                                    on project.IDClient equals client.IDClient
                                  join user in _context.Users
                                    on project.CreationUser equals user.IDUser
                                  select new
                                  {
                                      project.IDProject,
                                      project.ProjectName,
                                      project.ProjectCreationAt,
                                      project.ProjecUpdateAt,
                                      project.ProjectStatus,
                                      client.ClientName,
                                      user.UserName
                                  };

                if ( projectList == null || projectList.Count() == 0 ) return NotFound( new { message = $"No se encuentra ningún proyecto registrado" } );

                return Ok( projectList );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al obtener la lista de projectos. ERROR: { ex.Message }" } );
            }
        }

        // Obtención de la lista de clientes registrados
        [HttpGet]
        [Route("getClientsList")]
        [Authorize(Policy = "Adm")]
        public async Task<ActionResult> getClientsList()
        {
            try
            {
                var clientsList = from client in _context.Clients
                                  join user in _context.Users
                                    on client.CreationUser equals user.IDUser
                                  select new
                                  {
                                      client.IDClient,
                                      client.ClientName,
                                      client.ClientCreationAt,
                                      client.ClientUpdateAt,
                                      user.UserName,
                                  };

                if (clientsList == null || clientsList.Count() == 0) return NotFound( new { message = $"No se ha encotrado ningún cliente registrado" } );

                return Ok( clientsList );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al obtener la lista de clientes. ERROR: { ex.Message }" } );
            }
        }

        // Obtención de la lista de tipos de documentos registrados
        [HttpGet]
        [Route("getDTList")]
        [AllowAnonymous]
        //[Authorize(Policy = "Adm")]
        public async Task<ActionResult> getDTList()
        {
            try
            {
                var dtList = from dt in _context.DocType
                             join user in _context.Users
                                on dt.CreationUser equals user.IDUser
                             select new
                             {
                                 dt.IDDT,
                                 dt.DTName,
                                 dt.DTCreationAt,
                                 dt.DTUpdateAt,
                                 user.UserName,
                             };

                if (dtList == null || dtList.Count() == 0) return NotFound( new { message = $"No se ha encontrado ningún tipo de documento registrado" } );
                             
                return Ok( dtList );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al obtener la lista de tipos de documentos. ERROR: { ex.Message }" } );
            }
        }
    }
}
