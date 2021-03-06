using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

using System.DirectoryServices;
using Microsoft.AspNetCore.Authorization;

using DocumentRetentionAPI.Models;
using DocumentRetentionAPI.Helpers;

using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace DocumentRetentionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly DRDBContext _context;
        private readonly IConfiguration _config;
        private bool authenticated;
        private string bearerToken = null;
        private AuthUser _auth = new AuthUser();

        public LoginController(DRDBContext context, IConfiguration configuration)
        {
            _context = context;
            _config = configuration;
        }

        // Método de autenticación
        [HttpPost][AllowAnonymous]  
        public async Task<IActionResult> login([FromBody] LoginTemplate loginData )
        {
            // Autenticación por LDAP
            string domainUser = @"CW01\" + loginData.UID;

            DirectoryEntry entry = new DirectoryEntry(_config.GetValue<string>("AuthLDAP"), domainUser, loginData.Pass);

            try
            {
                DirectorySearcher searcher = new DirectorySearcher(entry);
                SearchResult result = searcher.FindOne();
                if ( result == null)
                {
                    return Unauthorized( new { message = $"Acceso no permitido al sistema." } );
                }
                else
                {
                    if (this.DBQueryUser(loginData.UID))
                    {
                        this.generateToken();
                        if ( bearerToken != null)
                        {
                            
                            return Ok( new { token = bearerToken } );
                        }
                    }
                    return Unauthorized(new { message = $"El usuario especificado no tiene acceso al sitema." } );
                }
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"{ex.Message}" } );
            }
        }

        // Búsqueda del usuario en la base de datos del sistema
        [HttpGet][AllowAnonymous]
        private /*Task<ActionResult>*/ bool DBQueryUser(string uid)
        {
            try
            {
                // Consulta del usuario en la base de datos
                var userExist = from user in _context.Users
                                where user.UID.ToUpper() == uid.ToUpper() && user.UserStatus == true
                                select new
                                {
                                    user.IDUser,
                                    user.UID,
                                    user.UserName,
                                    user.UserEmail,
                                    user.IDRole
                                };

                _auth.UID = userExist.First().UID;
                _auth.Name = userExist.First().UserName;
                _auth.Email = userExist.First().UserEmail;
                _auth.IDRole = userExist.First().IDRole;
                _auth.IDUser = userExist.First().IDUser;

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        // Creación del token de autorización
        [HttpGet][AllowAnonymous]
        private string generateToken()
        {
            var secretKey = _config.GetValue<string>("SecretKey"); // Lectura de la SecretKey para generar el token
            var key = Encoding.ASCII.GetBytes(secretKey);

            var claims = new ClaimsIdentity(); // Creación de claims para el inicio de sesión
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, _auth.UID));
            claims.AddClaim(new Claim("Name", _auth.Name));
            claims.AddClaim(new Claim("Email", _auth.Email));
            claims.AddClaim(new Claim("Role", _auth.IDRole.ToString()));
            claims.AddClaim(new Claim("IDUser", _auth.IDUser.ToString()));

            _auth = null;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims, // Agregamos los claims al descriptor del token
                Expires = DateTime.UtcNow.AddMinutes(59), // Definimos el tiempo de expiración del token
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                // Agregamos los datos de inicio de sesión encriptados en Sha256
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);
            bearerToken = tokenHandler.WriteToken(createdToken);

            return bearerToken;
        }
    }
}
