using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentRetentionAPI.Migrations
{
    public partial class ChangeColumnNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Processes_IDProcesses",
                table: "Documents");

            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Projects_IDProjects",
                table: "Documents");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Users",
                newName: "UserUpdateAt");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Users",
                newName: "UserStatus");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "UserEmail");

            migrationBuilder.RenameColumn(
                name: "CreationAt",
                table: "Users",
                newName: "UserCreationAt");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Projects",
                newName: "ProjectCreationAt");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Projects",
                newName: "ProjectStatus");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Projects",
                newName: "ProjectName");

            migrationBuilder.RenameColumn(
                name: "CreationAt",
                table: "Projects",
                newName: "ProjecUpdateAt");

            migrationBuilder.RenameColumn(
                name: "IDProjects",
                table: "Projects",
                newName: "IDProject");

            migrationBuilder.RenameColumn(
                name: "UpdaeAt",
                table: "Processes",
                newName: "ProcessUpdaeAt");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Processes",
                newName: "ProcessStatus");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Processes",
                newName: "ProcessName");

            migrationBuilder.RenameColumn(
                name: "CreationAt",
                table: "Processes",
                newName: "ProcessCreationAt");

            migrationBuilder.RenameColumn(
                name: "IDProcesses",
                table: "Processes",
                newName: "IDProcess");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Documents",
                newName: "DocumentUpdateAt");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Documents",
                newName: "DocumentStatus");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Documents",
                newName: "DocumentStartDate");

            migrationBuilder.RenameColumn(
                name: "Path",
                table: "Documents",
                newName: "DocumentPath");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Documents",
                newName: "DocumentName");

            migrationBuilder.RenameColumn(
                name: "IDProjects",
                table: "Documents",
                newName: "IDProject");

            migrationBuilder.RenameColumn(
                name: "IDProcesses",
                table: "Documents",
                newName: "IDProcess");

            migrationBuilder.RenameColumn(
                name: "DueDate",
                table: "Documents",
                newName: "DocumentDueDate");

            migrationBuilder.RenameColumn(
                name: "CreationAt",
                table: "Documents",
                newName: "DocumentCreationAt");

            migrationBuilder.RenameIndex(
                name: "IX_Documents_IDProjects",
                table: "Documents",
                newName: "IX_Documents_IDProject");

            migrationBuilder.RenameIndex(
                name: "IX_Documents_IDProcesses",
                table: "Documents",
                newName: "IX_Documents_IDProcess");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "DocType",
                newName: "DTUpdateAt");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "DocType",
                newName: "DTName");

            migrationBuilder.RenameColumn(
                name: "CreationAt",
                table: "DocType",
                newName: "DTCreationAt");

            migrationBuilder.RenameColumn(
                name: "UpdateAt",
                table: "Clients",
                newName: "ClientUpdateAt");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Clients",
                newName: "ClientName");

            migrationBuilder.RenameColumn(
                name: "CreationAt",
                table: "Clients",
                newName: "ClientCreationAt");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Processes_IDProcess",
                table: "Documents",
                column: "IDProcess",
                principalTable: "Processes",
                principalColumn: "IDProcess");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Projects_IDProject",
                table: "Documents",
                column: "IDProject",
                principalTable: "Projects",
                principalColumn: "IDProject");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Processes_IDProcess",
                table: "Documents");

            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Projects_IDProject",
                table: "Documents");

            migrationBuilder.RenameColumn(
                name: "UserUpdateAt",
                table: "Users",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "UserStatus",
                table: "Users",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "UserEmail",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "UserCreationAt",
                table: "Users",
                newName: "CreationAt");

            migrationBuilder.RenameColumn(
                name: "ProjectStatus",
                table: "Projects",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "ProjectName",
                table: "Projects",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ProjectCreationAt",
                table: "Projects",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "ProjecUpdateAt",
                table: "Projects",
                newName: "CreationAt");

            migrationBuilder.RenameColumn(
                name: "IDProject",
                table: "Projects",
                newName: "IDProjects");

            migrationBuilder.RenameColumn(
                name: "ProcessUpdaeAt",
                table: "Processes",
                newName: "UpdaeAt");

            migrationBuilder.RenameColumn(
                name: "ProcessStatus",
                table: "Processes",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "ProcessName",
                table: "Processes",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ProcessCreationAt",
                table: "Processes",
                newName: "CreationAt");

            migrationBuilder.RenameColumn(
                name: "IDProcess",
                table: "Processes",
                newName: "IDProcesses");

            migrationBuilder.RenameColumn(
                name: "IDProject",
                table: "Documents",
                newName: "IDProjects");

            migrationBuilder.RenameColumn(
                name: "IDProcess",
                table: "Documents",
                newName: "IDProcesses");

            migrationBuilder.RenameColumn(
                name: "DocumentUpdateAt",
                table: "Documents",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "DocumentStatus",
                table: "Documents",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "DocumentStartDate",
                table: "Documents",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "DocumentPath",
                table: "Documents",
                newName: "Path");

            migrationBuilder.RenameColumn(
                name: "DocumentName",
                table: "Documents",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "DocumentDueDate",
                table: "Documents",
                newName: "DueDate");

            migrationBuilder.RenameColumn(
                name: "DocumentCreationAt",
                table: "Documents",
                newName: "CreationAt");

            migrationBuilder.RenameIndex(
                name: "IX_Documents_IDProject",
                table: "Documents",
                newName: "IX_Documents_IDProjects");

            migrationBuilder.RenameIndex(
                name: "IX_Documents_IDProcess",
                table: "Documents",
                newName: "IX_Documents_IDProcesses");

            migrationBuilder.RenameColumn(
                name: "DTUpdateAt",
                table: "DocType",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "DTName",
                table: "DocType",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "DTCreationAt",
                table: "DocType",
                newName: "CreationAt");

            migrationBuilder.RenameColumn(
                name: "ClientUpdateAt",
                table: "Clients",
                newName: "UpdateAt");

            migrationBuilder.RenameColumn(
                name: "ClientName",
                table: "Clients",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ClientCreationAt",
                table: "Clients",
                newName: "CreationAt");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Processes_IDProcesses",
                table: "Documents",
                column: "IDProcesses",
                principalTable: "Processes",
                principalColumn: "IDProcesses");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Projects_IDProjects",
                table: "Documents",
                column: "IDProjects",
                principalTable: "Projects",
                principalColumn: "IDProjects");
        }
    }
}
