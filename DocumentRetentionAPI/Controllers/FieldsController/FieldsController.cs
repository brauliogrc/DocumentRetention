using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DocumentRetentionAPI.Helpers;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;


namespace DocumentRetentionAPI.Controllers.FieldsController
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldsController : ControllerBase
    {
        private readonly DRDBContext _context;
        private readonly IConfiguration _conf;
        private ProjectFieldHelper projectField = new ProjectFieldHelper();
        private List<ProjectFieldHelper> listField = new List<ProjectFieldHelper>();

        public FieldsController( DRDBContext context, IConfiguration conf )
        {
            _context = context;
            _conf = conf;
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
                    return
                        
                        NotFound(new { message = $"No se ha encontrado ningún projecto registrado." });
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

        // Obtención de los clientes registrados para el "select" del componente "Doc-Viewer" del admin
        /*[HttpGet][Route("getAdminClients")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> getAdminClients()
        {
            try
            {
                var field = from client in _context.Clients
                            select new
                            {
                                client.IDClient,
                                client.ClientName
                            };

                if ( field == null || field.Count() == 0 )
                {
                    return NotFound( new { message = $"No de ha encontrado ningún cliente registrado." } );
                }

                return Ok( field );
            }
            catch(Exception ex)
            {
                return BadRequest( new { message = $"Ha ocurrido un error al obtener los campos del listado de clientes. ERROR: {ex.Message}" } );
            }
        }*/

        // Obtención de los clientes registrados para el "select" del componente "Doc-Viewer" de cualquier usuario
        [HttpGet][Route("getUserClients")][AllowAnonymous]
        public async Task<ActionResult> getUserClients()
        {
            try
            {
                var field = from client in _context.Clients
                            select new
                            {
                                client.IDClient,
                                client.ClientName
                            };

                if ( field == null || field.Count() == 0 )
                {
                    return NotFound( new { message = $"No se ha encontrado ningún cliente registrado" } );
                }

                return Ok( field );
            }
            catch(Exception ex)
            {
                return BadRequest( new { message = $"Ha ocurrido un error al obtener los campos del listado de clientes. ERROR: {ex.Message}" } );
            }
        }

        // Obtención de los tipos de documentos para el "select" del componente "DocViewer" tanto para admin como para un usuario
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

        // Obtención de los usuarios para asociarlos a un documento como owner
        [HttpGet][Route("getOwnersList")][Authorize(Policy = "CapturistRole")]// [AllowAnonymous]
        public async Task<ActionResult> getOwners()
        {
            List<DataOwners> listOwners = new List<DataOwners>();
            string shortDate = DateTime.Now.Year.ToString() + "-" + DateTime.Now.Month.ToString() + "-" + DateTime.Now.Day.ToString() + " 00:00:00";
            // string[] longDate = DateTime.Parse(shortDate).ToString().Split('a');
            try
            {
                // SqlConnection sqlConnection = new SqlConnection(_conf.GetConnectionString("RHPortal"));
                string query = "SELECT [EmployeeNumber], [FullName] " +
                                "FROM [p_HRPortal].[dbo].[VW_EmployeeData] " +
                                //"WHERE [Plant] = 'Tijera' AND [UpdateTiemeStamp] >= '" + longDate[0] + "'";
                                "WHERE [Plant] = 'Tijera' AND [UpdateTiemeStamp] >= '" + shortDate + "'";

                using ( SqlConnection conn = new SqlConnection( _conf.GetConnectionString( "RHPortal" ) ) )
                {
                    using (SqlCommand command = new SqlCommand(query, conn))
                    {
                        conn.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while ( reader.Read() )
                            {
                                Console.WriteLine($"{reader.GetInt32(0)} - {reader.GetString(1)}" );
                                // Obtenemos a los datos de la consulta mediente indices, por medio de la posición del valo obtenido segun lo indica la consulta
                                // y reamos un objeto de "DataOwners" para almacenarlo en la lista de objetos
                                listOwners.Add( new DataOwners() { employeeNumber = Int64.Parse(reader.GetInt32(0).ToString()), employeeName = reader.GetString(1).Trim() } );
                            }
                        }
                        conn.Close();
                    }
                }

                return Ok( listOwners );
            }
            catch(Exception ex)
            {
                return BadRequest( new { message = $"Ha ocurrido un error al obtener la lista de owners. ERROR: {ex.Message}" } );
            }
        }

        // Obtención de los roles de usuario
        [HttpGet][Route("getUserRoles")][Authorize(Policy = "Adm")]
        public async Task<ActionResult> getUserRoles()
        {
            try
            {
                var field = from rol in _context.Roles
                            select new
                            {
                                rol.IDRole,
                                rol.RoleName
                            };

                if ( field == null || field.Count() == 0 )
                {
                    return BadRequest( new { message = $"No se ha encontrado nigún rol registrado" } );
                }

                return Ok( field );
            }
            catch ( Exception ex )
            {
                return BadRequest( new { message = $"Ha ocurrido un error al obtener los roles de usuario. ERROR: { ex.Message }" } );
            }
        }
    }

    public class DataOwners
    {
        public long employeeNumber { get; set; }
        public string employeeName { get; set; }
    }

}
