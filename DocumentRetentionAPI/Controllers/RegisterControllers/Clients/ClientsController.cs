using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using DocumentRetentionAPI.Helpers.ExistenceValidation;
using DocumentRetentionAPI.Helpers.Templates.ClientsTemplates;

namespace DocumentRetentionAPI.Controllers.RegisterControllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly DRDBContext _context;
        private readonly ExistenceValidationHelper _existence;

        public ClientsController(DRDBContext context)
        {
            _context = context;
            _existence = new ExistenceValidationHelper(_context);
        }

        // Registro de un nuevo cliente
        [HttpPost][Route("addNewClient")][Authorize(Policy = "Adm")]
        public async Task<IActionResult> addNewClient( [FromBody] NewClient newClient)
        {
            try
            {
                // verificación de existencia del cliente
                if (_existence.clientExistence(newClient.name)) return Conflict( new { message = $"Ya se enceuntra un cliente registrado con el nombre de {newClient.name}" } );

                var client = new DocumentRetentionAPI.Models.Clients
                {
                    ClientName = newClient.name,
                    ClientCreationAt = DateTime.Now,
                    ClientUpdateAt = DateTime.Now,
                    CreationUser = newClient.creationUser,
                };

                _context.Clients.Add(client);
                await _context.SaveChangesAsync();

                return Ok( new { message = $"El cliente \'{newClient.name}\' se ha registrado correctamente" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al registrar el nuevo cliente. ERROR: { ex.Message }" } );
            }
        }

        // Actuaización de los datos del cliente
        [HttpPatch][Route("updateClient")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> updateClient( [FromBody] UpdateClient updateClient )
        {
            bool isValid = false;
            string aux;
            try
            {
                var client = await _context.Clients.FindAsync( updateClient.clientId );

                if (client == null) return NotFound( new { message = $"No se ha encontrado el cliente especificado en la base de datos" } );

                if ( updateClient.newName != null && updateClient.newName.Length > 0 )
                {
                    isValid = true;
                    client.ClientName = updateClient.newName.ToString();
                }

                if ( isValid )
                {
                    client.ClientUpdateAt = DateTime.Now;
                    _context.Clients.Update(client);
                    await _context.SaveChangesAsync();

                    return Ok( new { message = $"Cliente Actualizado correctamente" } );
                }

                return Ok( new { message = $"Ningún cambio realizado" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al actuaizar el cliente. ERROR: { ex.Message }" } );
            }
        }
    }
}
