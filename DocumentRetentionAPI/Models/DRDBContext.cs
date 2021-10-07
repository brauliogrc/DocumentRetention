using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentRetentionAPI.Models
{
    public class DRDBContext : DbContext
    {
        public DRDBContext(DbContextOptions<DRDBContext> options) : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Processes> Processes { get; set; }
        public DbSet<Clients> Clients { get; set; }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<DocType> DocType { get; set; }
        public DbSet<Documents> Documents { get; set; }
        public DbSet<Roles> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Relación 1:N entre tablas "Documents" y "Processes"
            modelBuilder.Entity<Users>()
                .HasOne<Roles>(user => user.role)
                .WithMany(role => role.user)
                .HasForeignKey(user => user.IDRole)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "Processes" y "Users"
            modelBuilder.Entity<Processes>()
                .HasOne<Users>(process => process.user)
                .WithMany(user => user.process)
                .HasForeignKey(process => process.CreationUser)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "Clients" y "Users"
            modelBuilder.Entity<Clients>()
                .HasOne<Users>(client => client.user)
                .WithMany(user => user.client)
                .HasForeignKey(client => client.CreationUser)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "Projects" y "Users"
            modelBuilder.Entity<Projects>()
                .HasOne<Users>(project => project.user)
                .WithMany(user => user.project)
                .HasForeignKey(project => project.CreationUser)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "DocType" y "Users"
            modelBuilder.Entity<DocType>()
                .HasOne<Users>(docType => docType.user)
                .WithMany(user => user.docType)
                .HasForeignKey(docType => docType.CreationUser)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "Documents" y "Users"
            modelBuilder.Entity<Documents>()
                .HasOne<Users>(document => document.user)
                .WithMany(user => user.document)
                .HasForeignKey(document => document.CreationUser)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "Documents" y "Processes"
            modelBuilder.Entity<Documents>()
                .HasOne<Processes>(document => document.process)
                .WithMany(process => process.document)
                .HasForeignKey(document => document.IDProcess)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "Projects" y "Clients"
            modelBuilder.Entity<Projects>()
                .HasOne<Clients>(project => project.client)
                .WithMany(client => client.project)
                .HasForeignKey(project => project.IDClient)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "Documents" y "Projects"
            modelBuilder.Entity<Documents>()
                .HasOne<Projects>(document => document.project)
                .WithMany(project => project.document)
                .HasForeignKey(document => document.IDProject)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación 1:N entre tablas "Documents" y "DocType"
            modelBuilder.Entity<Documents>()
                .HasOne<DocType>(document => document.docType)
                .WithMany(docType => docType.document)
                .HasForeignKey(document => document.IDDT)
                .OnDelete(DeleteBehavior.NoAction);
        }

    }
}
