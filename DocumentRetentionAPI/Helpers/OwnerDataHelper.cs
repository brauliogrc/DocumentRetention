using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace DocumentRetentionAPI.Helpers
{
    public class OwnerDataHelper
    {
        private readonly IConfiguration _conf;

        public OwnerDataHelper(IConfiguration conf)
        {
            _conf = conf;
        }

        // Busqueda de nombre del propietario del documento en base a su número de empleado
        public string? getOwnerData(long employeeNumber)
        {
            string ownerName = "";
            try
            {
                string query = "SELECT [FullName] " +
                    "FROM [p_HRPortal].[dbo].[VW_EmployeeData] " +
                    "WHERE [EmployeeNumber] = " + employeeNumber;

                using ( SqlConnection conn = new SqlConnection( _conf.GetConnectionString( "RHPortal" ) ) )
                {
                    using ( SqlCommand command = new SqlCommand( query, conn ) )
                    {
                        conn.Open();
                        using( SqlDataReader reader = command.ExecuteReader() )
                        {
                            bool flagFirstRow = false;
                            while ( reader.Read() && !flagFirstRow )
                            {
                                Console.WriteLine($"{reader.GetString(0)}");
                                ownerName = reader.GetString(0).Trim();
                                flagFirstRow = true;
                            }
                        }
                        conn.Close();
                    }
                }

                if ( ownerName.Length != 0 )
                {
                    return ownerName;
                }

                return null;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
