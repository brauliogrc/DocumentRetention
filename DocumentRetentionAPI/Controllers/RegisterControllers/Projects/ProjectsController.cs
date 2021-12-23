using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using DocumentRetentionAPI.Helpers.ExistenceValidation;
using DocumentRetentionAPI.Helpers.Templates.ProjectsTemplates;

namespace DocumentRetentionAPI.Controllers.RegisterControllers.Projects
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly DRDBContext _context;
        private readonly ExistenceValidationHelper _existence;

        public ProjectsController(DRDBContext context)
        {
            _context = context;
            _existence = new ExistenceValidationHelper(_context);
        }

        // Registro de un nuevo projecto
        [HttpPost][Route("addNewProject")][Authorize(Policy = "Adm")]
        public async Task<IActionResult> addNewProject ( [FromBody] NewProject newProject )
        {
            try
            {
                // Verificación de existencia del cliente
                if (_existence.projectExistence(newProject.name)) return Conflict( new { message = $"Ya se enceuntra un proyecto registrado con el nombre de {newProject.name}" } );

                var project = new DocumentRetentionAPI.Models.Projects
                {
                    ProjectName = newProject.name,
                    IDClient = newProject.client,
                    CreationUser = newProject.creationUser,
                    ProjectCreationAt = DateTime.Now,
                    ProjecUpdateAt = DateTime.Now,
                    ProjectStatus = true,
                };

                _context.Projects.Add(project);
                await _context.SaveChangesAsync();

                return Ok( new { message = $"El proyecto \'{newProject.name}\' se ha registrado correctamente" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al registrar el nuevo proyecto. ERROR: { ex.Message }" } );
            }
        }

        // Acatualización de los datos del proyecto
        [HttpPatch][Route("updateProject")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> updateProject( [FromBody] UpdateProject updateProject )
        {
            bool isValid = false;
            string aux;
            try
            {
                var project = await _context.Projects.FindAsync(updateProject.projectId);

                if (project == null) return NotFound(new { message = $"No se ha encontrado el proceso especificado en la base de datos" } );

                if (updateProject.newName != null && updateProject.newName.Length > 0 )
                {
                    isValid = true;
                    project.ProjectName = updateProject.newName.ToString();
                }

                if ( updateProject.newStatus != null )
                {
                    isValid = true;
                    aux = updateProject.newStatus.ToString();
                    project.ProjectStatus = Convert.ToBoolean( Convert.ToInt32( aux ) );
                }

                if ( isValid )
                {
                    project.ProjecUpdateAt = DateTime.Now;
                    _context.Projects.Update(project);
                    await _context.SaveChangesAsync();
                    return Ok( new { message = $"Proyecto actualizado correctamente" } );
                }

                return Ok( new { message = $"Ningún cambio realizado" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al actualizar el proyecto. ERROR: { ex.Message }" } );
            }
        }

        // Eliminación lógica del proyecto
        [HttpDelete][Route("deleteProject/{idProject}")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> deleteProject( int idProject)
        {
            try
            {
                var project = await _context.Projects.FindAsync( idProject );

                if (project == null) return NotFound( new { message = $"Proyecto no encontrado en la base de datos" } );

                project.ProjectStatus = false;
                project.ProjecUpdateAt = DateTime.Now;

                _context.Projects.Update(project);
                await _context.SaveChangesAsync();

                return Ok( new { message = $"Se ha eliminado el proyecto \'{project.ProjectName}\'" } );
            }
            catch( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al eliminar el proyecto. ERROR: { ex.Message }" } );
            }
        }
    }
}
