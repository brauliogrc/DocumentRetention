using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using DocumentRetentionAPI.Helpers.Interfaces.UsersInterfaces;
using DocumentRetentionAPI.Helpers.ExistenceValidation;

namespace DocumentRetentionAPI.Controllers.RegisterControllers.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DRDBContext _context;
        private readonly ExistenceValidationHelper _existence;

        public UsersController(DRDBContext context /*, ExistenceValidationHelper existence*/ )
        {
            _context = context;
            _existence = new ExistenceValidationHelper( _context );

            //_existence = existence;
        }

        //Registro de un nuevo usuario
        [HttpPost][Route("addNewUser")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> addNewUser( [FromBody] NewUser newUser)
        {
            try
            {
                // Verificación de la existencia del usuario
                if (_existence.userExistence(newUser.UID)) return Conflict( new { message = $"El usuario ya se encuentra registrado" } ); // Encontar el codifo de peticion correcta a devolver

                var user = new DocumentRetentionAPI.Models.Users()
                {
                    UID = newUser.UID,
                    UserName = newUser.name,
                    UserEmail = newUser.email,
                    IDRole = newUser.role,

                    // Asignación de fechas de creación y actualización
                    UserUpdateAt = DateTime.Now,
                    UserCreationAt = DateTime.Now,

                    // Asignación del status del usuario
                    UserStatus = true,
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok( new { message = $"El usuario se ha registrado con exito" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al registrar el nuevo usuario. ERROR: { ex.Message }" } );
            }
        }

        // Actualización o modificación de un usuario
        [HttpPatch][Route("updateUser")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> updateUser( [FromBody] UpdateUser updateUser )
        {
            bool valid = false;
            string aux;
            try
            {
                var user = await _context.Users.FindAsync( updateUser.userId );

                if ( user == null ) return NotFound( new { message = $"No se ha encontrado el usuario especificado en la base de datos" } );

                if ( updateUser.newEmail != null && updateUser.newEmail.Length > 0 )
                {
                    valid = true;
                    user.UserEmail = updateUser.newEmail;
                }
                if ( updateUser.newStatus != null )
                {
                    valid = true;
                    aux = updateUser.newStatus.ToString();
                    user.UserStatus = Convert.ToBoolean( Convert.ToInt32( aux ) );
                }
                if ( updateUser.newRole != null )
                {
                    valid = true;
                    aux = updateUser.newRole.ToString();
                    user.IDRole = Int32.Parse( aux );
                }
                if ( valid )
                {
                    _context.Users.Update( user );
                    await _context.SaveChangesAsync();
                    return Ok( new { message = $"Usuario actualizado correctamente" } );
                }

                return Ok(new { message = $"Ningún cambio realizado" });
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al acrualizar el usuario. ERROR: { ex.Message }" } );
            }
        }

        // Eliminación lógica de un usuario
        [HttpDelete][Route("deleteUser/{IdUser}")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> deleteUser( long IdUser )
        {
            try
            {
                var user = await _context.Users.FindAsync( IdUser );
                
                if ( user  == null )
                {
                    return NotFound( new { message = $"Usuario no encontrad en la base de datos." } );
                }

                user.UserStatus = false;
                user.UserUpdateAt = DateTime.Now;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok( new { message = $"Se ha eliminado el usuario \'{ user.UserName }\'" } );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al eliminar el usuario. ERROR: { ex.Message }" } );
            }
        }

    }
}
