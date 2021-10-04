using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentRetentionAPI.Migrations
{
    public partial class CreateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    IDRole = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.IDRole);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    IDUser = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UID = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IDRole = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.IDUser);
                    table.ForeignKey(
                        name: "FK_Users_Roles_IDRole",
                        column: x => x.IDRole,
                        principalTable: "Roles",
                        principalColumn: "IDRole");
                });

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    IDClient = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationUser = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.IDClient);
                    table.ForeignKey(
                        name: "FK_Clients_Users_CreationUser",
                        column: x => x.CreationUser,
                        principalTable: "Users",
                        principalColumn: "IDUser");
                });

            migrationBuilder.CreateTable(
                name: "DocType",
                columns: table => new
                {
                    IDDT = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationUser = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocType", x => x.IDDT);
                    table.ForeignKey(
                        name: "FK_DocType_Users_CreationUser",
                        column: x => x.CreationUser,
                        principalTable: "Users",
                        principalColumn: "IDUser");
                });

            migrationBuilder.CreateTable(
                name: "Processes",
                columns: table => new
                {
                    IDProcesses = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    UpdaeAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IDOwner = table.Column<long>(type: "bigint", nullable: false),
                    NameOwner = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    CreationUser = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Processes", x => x.IDProcesses);
                    table.ForeignKey(
                        name: "FK_Processes_Users_CreationUser",
                        column: x => x.CreationUser,
                        principalTable: "Users",
                        principalColumn: "IDUser");
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    IDProjects = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IDClient = table.Column<int>(type: "int", nullable: false),
                    CreationUser = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.IDProjects);
                    table.ForeignKey(
                        name: "FK_Projects_Clients_IDClient",
                        column: x => x.IDClient,
                        principalTable: "Clients",
                        principalColumn: "IDClient");
                    table.ForeignKey(
                        name: "FK_Projects_Users_CreationUser",
                        column: x => x.CreationUser,
                        principalTable: "Users",
                        principalColumn: "IDUser");
                });

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    IDDocument = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Path = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IDProcesses = table.Column<int>(type: "int", nullable: false),
                    IDProjects = table.Column<int>(type: "int", nullable: false),
                    IDDT = table.Column<int>(type: "int", nullable: false),
                    CreationUser = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.IDDocument);
                    table.ForeignKey(
                        name: "FK_Documents_DocType_IDDT",
                        column: x => x.IDDT,
                        principalTable: "DocType",
                        principalColumn: "IDDT");
                    table.ForeignKey(
                        name: "FK_Documents_Processes_IDProcesses",
                        column: x => x.IDProcesses,
                        principalTable: "Processes",
                        principalColumn: "IDProcesses");
                    table.ForeignKey(
                        name: "FK_Documents_Projects_IDProjects",
                        column: x => x.IDProjects,
                        principalTable: "Projects",
                        principalColumn: "IDProjects");
                    table.ForeignKey(
                        name: "FK_Documents_Users_CreationUser",
                        column: x => x.CreationUser,
                        principalTable: "Users",
                        principalColumn: "IDUser");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clients_CreationUser",
                table: "Clients",
                column: "CreationUser");

            migrationBuilder.CreateIndex(
                name: "IX_DocType_CreationUser",
                table: "DocType",
                column: "CreationUser");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_CreationUser",
                table: "Documents",
                column: "CreationUser");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_IDDT",
                table: "Documents",
                column: "IDDT");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_IDProcesses",
                table: "Documents",
                column: "IDProcesses");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_IDProjects",
                table: "Documents",
                column: "IDProjects");

            migrationBuilder.CreateIndex(
                name: "IX_Processes_CreationUser",
                table: "Processes",
                column: "CreationUser");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_CreationUser",
                table: "Projects",
                column: "CreationUser");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_IDClient",
                table: "Projects",
                column: "IDClient");

            migrationBuilder.CreateIndex(
                name: "IX_Users_IDRole",
                table: "Users",
                column: "IDRole");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DropTable(
                name: "DocType");

            migrationBuilder.DropTable(
                name: "Processes");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
