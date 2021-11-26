using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentRetentionAPI.Models;
using DocumentRetentionAPI.Helpers;
using DocumentRetentionAPI.Helpers.Interfaces;
using Microsoft.Extensions.Configuration;

namespace DocumentRetentionAPI.Controllers.RegisterControllers.Documents
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocsController : ControllerBase
    {
        private readonly DRDBContext _context;
        private readonly IConfiguration _conf;
        private readonly FileStorageHandler fsh;

        public DocsController(DRDBContext context, IConfiguration conf)
        {
            _context = context;
            _conf = conf;

            fsh = new FileStorageHandler(context, conf);
        }


        // Registro de un nuevo documento en la DB
        [HttpPost]
        [Route("addNewDocument")]
        [Authorize(Policy = "CapturistRole")]
        public async Task<IActionResult> addNewDocument([FromForm] NewDocument newDoc)
        {
            OwnerDataHelper ownerDataHelper = new OwnerDataHelper(_conf);
            string[] pathAndName;
            string successMessage;
            try
            {
                var addDocument = new DocumentRetentionAPI.Models.Documents()
                {
                    // Datos traidos del formulario
                    ownerEmployNum = newDoc.ownerEmployeeNumber,
                    DocumentStartDate = DateTime.Parse(newDoc.startDate),
                    DocumentDueDate = DateTime.Parse(newDoc.dueDate),
                    IDProcess = Int32.Parse(newDoc.process),
                    IDProject = Int32.Parse(newDoc.project),
                    IDDT = Int32.Parse(newDoc.docType),
                    // DocumentVersion = newDoc.version
                    CreationUser = Int64.Parse(newDoc.creationUser),

                    // Datos generados automáticamente
                    DocumentCreationAt = DateTime.Now,
                    DocumentStatus = true,
                    DocumentComment = null,
                };

                // Obtener el nombre del owner del documento
                addDocument.ownerName = ownerDataHelper.getOwnerData(newDoc.ownerEmployeeNumber);

                // Validación del nombre del archivo y almacenamiento/registro del mismo
                //pathAndName = fsh.saveFiles(newDoc.file, newDoc.process, newDoc.project);
                pathAndName = fsh.saveFiles(newDoc.file/*, version */);
                if (pathAndName == null)
                {
                    return BadRequest(new { message = $"Ha ocurrido un error al almacenar el archivo ajunto. El archivo no es valido o el nombre del archivo ya se encuentra registrado" });
                }

                addDocument.DocumentName = pathAndName[1];
                addDocument.DocumentPath = pathAndName[0];

                _context.Documents.Add(addDocument);
                await _context.SaveChangesAsync();

                // successMessage = $"El documento \' {pathAndName[1]} \' ha sido registrado con exito";
                return Ok( new { message = $"El documento \' {pathAndName[1]} \' ha sido registrado con exito" } );
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Ha ocurrido un error al registrar el nuevo documento ERROR: {ex.Message}" });
            }
        }

        // Actualización o modificación de un documento en la DB
        [HttpPatch][Route("updateDocument")][Authorize(Policy = "Adm")]
        public async Task<IActionResult> updateDocument([FromBody] UpdateDocument updateDcuments)
        {
            OwnerDataHelper ownerDataHelper = new OwnerDataHelper(_conf);
            bool valid = false;
            // string changeTracking = DateTime.Now.Day.ToString() + "-" + DateTime.Now.Month.ToString() + "-" + DateTime.Now.Year.ToString() + "\n";
            string changeTracking = "";
            string aux;
            try
            {
                var doc = await _context.Documents.FindAsync( updateDcuments.idDoc );

                if ( doc == null )
                {
                    return NotFound( new { message = $"No se ha encontrado el documento especificado dentro de la base de datos" } );
                }
                if ( updateDcuments.newOwnerEmployeeNumber != null )
                {
                    valid = true;
                    string ownerEmployeeNumber = updateDcuments.newOwnerEmployeeNumber.ToString();
                    long employeeNumber = Int64.Parse(ownerEmployeeNumber);
                    doc.ownerEmployNum = employeeNumber;

                    doc.ownerName = ownerDataHelper.getOwnerData(employeeNumber);
                    changeTracking += "Cambio del propietario del documento,";
                }
                if ( updateDcuments.newStatus != null )
                {
                    valid = true;
                    string status = updateDcuments.newStatus.ToString();
                    doc.DocumentStatus = Convert.ToBoolean( Convert.ToInt32( status ) );
                    changeTracking += "Cambio de status del documento,";
                }
                if ( updateDcuments.newProcess != null )
                {
                    valid = true;
                    aux = updateDcuments.newProcess.ToString();
                    doc.IDProcess = Int32.Parse( aux );
                    changeTracking += "Cambio del proceso del documento,";
                }
                if ( updateDcuments.newProject != null )
                {
                    valid = true;
                    aux = updateDcuments.newProject.ToString();
                    doc.IDProject = Int32.Parse( aux );
                    changeTracking += "Cambio del projecto del documento,";
                }
                if ( updateDcuments.newDocType != null )
                {
                    valid = true;
                    aux = updateDcuments.newDocType.ToString();
                    doc.IDDT = Int32.Parse( aux );
                    changeTracking += "Cambio del tipo de documento,";
                }
                if (updateDcuments.newDueDate != null)
                {
                    valid = true;
                    aux = updateDcuments.newDueDate.ToString();
                    doc.DocumentDueDate = DateTime.Parse( aux );
                    changeTracking += "Cambio de fecha de vencimiento del documento,";
                }
                if ( updateDcuments.newStartDate != null )
                {
                    valid = true;
                    aux = updateDcuments.newStartDate.ToString();
                    doc.DocumentStartDate = DateTime.Parse( aux );
                    changeTracking += "Cambio de fecha de inicio del documento,";
                }

                if ( valid )
                {
                    doc.DocumentComment = changeTracking;
                    doc.DocumentUpdateAt = DateTime.Now;
                    _context.Documents.Update(doc);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = $"Documento actualizado correctamente" });
                }

                return Ok( new { message = $"Ningún cambio realizado" } );
            }
            catch (Exception ex)
            {
                return BadRequest( new { message = $"Ha ocurrido un error al editar la información del documento. ERROR: { ex.Message }" } );
            }
        }

        // Eliminación lógica de un documento
        [HttpDelete][Route("deleteDocment/{IdDocument}")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> deleteDocment( int IdDocument )
        {
            try
            {
                var document = await _context.Documents.FindAsync(IdDocument);

                if ( document == null )
                {
                    return NotFound( new { message = $"Documento no encontrado en la base de datos" } );
                }
                
                document.DocumentStatus = false;
                document.DocumentComment = "Cambio de status del documento,";
                document.DocumentUpdateAt = DateTime.Now;

                _context.Documents.Update(document);
                await _context.SaveChangesAsync();

                return Ok( new { message = $"Se ha eliminado el documento \' { document.DocumentName } \'" } );
            }
            catch (Exception ex)
            {
                return BadRequest( new { message = $"Ha ocuttido un error al eliminar el documento. ERROR: { ex.Message }" } );
            }
        }
    }
}
