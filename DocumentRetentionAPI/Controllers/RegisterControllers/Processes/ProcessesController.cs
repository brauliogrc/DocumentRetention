using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using DocumentRetentionAPI.Helpers.Templates.ProcessesTemplates;
using DocumentRetentionAPI.Helpers.ExistenceValidation;

namespace DocumentRetentionAPI.Controllers.RegisterControllers.Processes
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessesController : ControllerBase
    {
        private readonly DRDBContext _context;
        private readonly ExistenceValidationHelper _existence;

        public ProcessesController(DRDBContext context)
        {
            _context = context;
            _existence = new ExistenceValidationHelper(_context);
        }

        // Registro de un nuevo proceso
        [HttpPost][Route("addNewProcess")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> addNewProcess([FromBody] NewProcess newProcess )
        {
            try
            {
                // Verificación de la existencia del proceso
                if ( _existence.processExistence(newProcess.name) ) return Conflict(new { message = $"Ya se enceuntra un proceso registrado con el nombre de {newProcess.name}" }); // Encontar el codifo de peticion correcta a devolver

                var process = new DocumentRetentionAPI.Models.Processes()
                {
                    ProcessName = newProcess.name,
                    NameOwner = newProcess.ownerName,
                    IDOwner = newProcess.ownerNumber,
                    ProcessCreationAt = DateTime.Now,
                    ProcessUpdaeAt = DateTime.Now,
                    ProcessStatus = true,
                    CreationUser = newProcess.creationUser
                };

                _context.Processes.Add(process);
                await _context.SaveChangesAsync();

                return Ok( new { message = $"El proceso \'{newProcess.name}\' se ha registrado correctamente" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al registrar el nuevo proceso. ERROR: {ex.Message}" } );
            }
        }

        // Acatualización de los datos del proceso
        [HttpPatch][Route("updateProcess")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> updateProcess([FromBody] UpdateProcess updateProcess )
        {
            bool isValid = false;
            string aux;
            try
            {
                var process = await _context.Processes.FindAsync( updateProcess.processId );

                if (process == null) return NotFound( new { message = $"No se ha encontrado el proceso especificado en la base de datos" } );

                if ( updateProcess.newName != null && updateProcess.newName.Length > 0 )
                {
                    isValid = true;
                    process.ProcessName = updateProcess.newName.ToString();
                }
                if ( updateProcess.newOwnerNumber != null )
                {
                    isValid = true;
                    aux = updateProcess.newOwnerNumber.ToString();
                    process.IDOwner = Int64.Parse(aux);
                    process.NameOwner = updateProcess.newOwnerName.ToString();
                }
                if ( updateProcess.newStatus != null )
                {
                    isValid = true;
                    aux = updateProcess.newStatus.ToString();
                    process.ProcessStatus = Convert.ToBoolean( Convert.ToInt32( aux ) );
                }
                if ( isValid )
                {
                    process.ProcessUpdaeAt = DateTime.Now;
                    _context.Processes.Update(process);
                    await _context.SaveChangesAsync();
                    return Ok( new { message = $"Proceso actualizado correctamente" } );
                }
                return Ok( new { message = $"Ningún cambio realizado" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al actualizar el proceso. ERROR: { ex.Message }" } );
            }
        }

        // Eliminación lógica del proceso
        [HttpDelete][Route("deleteProcess/{idProcess}")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> deleteProcess( int idProcess)
        {
            try
            {
                var process = await _context.Processes.FindAsync( idProcess );

                if (process == null) return NotFound( new { message = $"Proceso no encontrado en la base de datos" } );

                process.ProcessStatus = false;
                process.ProcessUpdaeAt = DateTime.Now;

                _context.Processes.Update( process );
                await _context.SaveChangesAsync();

                return Ok( new { message = $"Se ha eliminado el proceso \'{process.ProcessName}\'" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al eleiminarl el proceso. ERROR: { ex.Message }" } );
            }
        }
    }
}
