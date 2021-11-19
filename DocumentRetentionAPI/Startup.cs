using DocumentRetentionAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using DocumentRetentionAPI.Helpers;
using DocumentRetentionAPI.Helpers.AuthorizationPolicies;

namespace DocumentRetentionAPI
{
    public class Startup
    {
        readonly string CorsConfiguration = "_config";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // Generación de token JWT
            var key = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("SecretKey"));
            // Agregamos el servicio de autenticación a utilizar
            services.AddAuthentication(x =>
            {
                // Definimos el método de autenticación por JWT
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // Agregando nuestra policity creada en "AuthorizationHndler"
            /*services.AddAuthorization( options => 
                options.AddPolicy( "aceptedRole", policy => 
                    policy.Requirements.Add( new AceptedRoles( 1, 2 ) ) ) );

            services.AddAuthorization( options =>
                options.AddPolicy( "AdminAuth", policy =>
                    policy.Requirements.Add( new AdminAuthorization( 1 ) ) ) );

            services.AddAuthorization( options =>
                options.AddPolicy( "CapturistRole", policy =>
                    policy.Requirements.Add( new CapturistAuthorization( 1, 2 ) ) ) );*/


            services.AddSingleton<IAuthorizationHandler, AceptedRolesHandler>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Adm", pol => pol.RequireClaim("Role", new string[] { "1" }));
                //options.AddPolicy("Capturist", pol => pol.RequireClaim("Role,", new string[] { "1", "2" }));
                options.AddPolicy("CapturistRole", pol => pol.RequireClaim("Role", new string[] { "1", "2" }));
            });

            // Definición del contexto de la DB (devDocumentRetentionSA para desarrollo, prodDocumentRetention para producción)
            services.AddDbContext<DRDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("devDocumentRetentionSA"))
            );

            // Configuración para aceptar el envio de json
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DocumentRetentionAPI", Version = "v1" });
            });

            // Configuración de Cors
            services.AddCors(options =>
            {
                options.AddPolicy(name: CorsConfiguration,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DocumentRetentionAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            // Afregar la configuración de cors
            app.UseCors(CorsConfiguration);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
