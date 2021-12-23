using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using DocumentRetentionAPI.Helpers.ExistenceValidation;
using DocumentRetentionAPI.Helpers.Templates.DocTypesTemplates;

namespace DocumentRetentionAPI.Controllers.RegisterControllers.DocTypes
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocTypesController : ControllerBase
    {
        private readonly DRDBContext _context;
        private readonly ExistenceValidationHelper _existence;

        public DocTypesController(DRDBContext context)
        {
            _context = context;
            _existence = new ExistenceValidationHelper(_context);
        }

        // Registro de un nuevo tipo de documento
        [HttpPost][Route("addNewDocType")][Authorize(Policy = "Adm")]
        public async Task<IActionResult> addNewDocType( [FromBody] NewDocType newDocType )
        {
            try
            {
                // Verificación de existencia del tipo de documento
                if (_existence.docTypeExistence(newDocType.name)) return Conflict( new { message = $"Ya se encuentra un tipo de documento registrado con el nombre de {newDocType.name}" } );

                var docType = new DocumentRetentionAPI.Models.DocType
                {
                    DTName = newDocType.name,
                    CreationUser = newDocType.creationUser,
                    DTCreationAt = DateTime.Now,
                    DTUpdateAt = DateTime.Now,
                };

                _context.DocType.Add(docType);
                await _context.SaveChangesAsync();

                return Ok( new { message = $"El tipo de documento \'{newDocType.name}\' se ha registrado correctamente" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al registrar el nuevo tipo de documento. ERROR: { ex.Message }" } );
            }
        }

        // Actualización de un tipo de documento
        [HttpPatch][Route("updateDocType")][Authorize( Policy = "Adm" )]
        public async Task<ActionResult> updateDocType( [FromBody] UpdateDocType updateDocType )
        {
            bool isValid = false;
            string aux;
            try
            {
                var dt = await _context.DocType.FindAsync( updateDocType.docTypeId );

                if (dt == null) return NotFound( new { message = $"No se ha encontrado el tipo de documento en la base de datos" } );

                if ( updateDocType.newName != null && updateDocType.newName.Length > 0 )
                {
                    isValid = true;
                    dt.DTName = updateDocType.newName.ToString();
                }

                if ( isValid )
                {
                    dt.DTUpdateAt = DateTime.Now;
                    _context.DocType.Update(dt);
                    await _context.SaveChangesAsync();

                    return Ok( new { message = $"Tipo de documento actualizado correctamente" } );
                }

                return Ok( new { message = $"Ningún cambio realizado" } );
            }
            catch ( Exception ex )
            {
                return BadRequest();
            }
        }
    }
}
