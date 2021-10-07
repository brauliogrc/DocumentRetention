using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Helpers;

namespace DocumentRetentionAPI.Controllers.FieldsController
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldsController : ControllerBase
    {
        private readonly DRDBContext _context;
        private ProjectFieldHelper projectField = new ProjectFieldHelper();
        private List<ProjectFieldHelper> listField = new List<ProjectFieldHelper>();

        public FieldsController( DRDBContext context)
        {
            _context = context;
        }

        // Obtención de los projectos registrados para el "select" del componente "Doc-Viewer" del admin
        [HttpGet][Route("getAdminProjects")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> getAdminProjects()
        {
            try
            {
                var field = from project in _context.Projects
                            select new
                            {
                                project.IDProject,
                                project.ProjectName
                            };

                if (field == null || field.Count() == 0)
                {
                    return NotFound(new { message = $"No se ha encontrado ningún projecto registrado." });
                }

                return Ok(field);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener los campos del listado de proyectos. ERROR: {ex.Message}" });
            }
        }

        // Obtención de los projectos registrados para el "select" del componente "Doc-Viewer" del cualquier ususario
        [HttpGet][Route("getUserProjects")][AllowAnonymous]
        public async Task<ActionResult> getUserProjects()
        {
            try
            {
                var field = from project in _context.Projects
                            where project.ProjectStatus == true
                            select new
                            {
                                project.IDProject,
                                project.ProjectName
                            };

                if (field == null || field.Count() == 0)
                {
                    return NotFound(new { message = $"No se ha encontrado ningún projecto registrado." });
                }

                return Ok(field);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener los campos del listado de proyectos. ERROR: {ex.Message}" });
            }
        }

        // Obtención de los procesos registrados para el "select" del componente "Doc-Viewer" del admin
        [HttpGet][Route("getAdminProcesses")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> getAdminProcesses()
        {
            try
            {
                var field = from process in _context.Processes
                            select new
                            {
                                process.IDProcess,
                                process.ProcessName,
                            };

                if ( field == null || field.Count() == 0)
                {
                    return NotFound(new { message = $"No se ha encontado ingún proceso registrado." });
                }

                return Ok(field);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener los campos del listado de procesos. ERROR: {ex.Message}" });
            }
        }

        // Obtención de los procesos registrados para el "select" del componente "Doc-Viewer" del cualquier usuario
        [HttpGet][Route("getUserProcesses")][AllowAnonymous]
        public async Task<ActionResult> getUserProcesses()
        {
            try
            {
                var field = from process in _context.Processes
                            where process.ProcessStatus == true
                            select new
                            {
                                process.IDProcess,
                                process.ProcessName,
                            };

                if (field == null || field.Count() == 0)
                {
                    return NotFound(new { message = $"No se ha encontado ningún proceso registrado." });
                }

                return Ok(field);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al obtener los campos del listado de procesos. ERROR: {ex.Message}" });
            }
        }

        // Obtención de los tipos de documentos para el "select" del componente "Doc"Viewer" tanto para admin como para un usuario
        [HttpGet][Route("getDocTypes")][AllowAnonymous]
        public async Task<ActionResult> getDocTypes()
        {
            try
            {
                var field = from DDT in _context.DocType
                            select new
                            {
                                DDT.IDDT,
                                DDT.DTName
                            };

                if ( field == null || field.Count() == 0)
                {
                    return NotFound( new { message = $"No se ha enontrado ningún tipo de documento registrado" } );
                }

                return Ok(field);
            }
            catch(Exception ex)
            {
                return BadRequest( new { message = $"Ha ocurrido un error al obtener los campos del listado de los tipos de documentos. ERROR: {ex.Message}" } );
            }
        }
    }
}
