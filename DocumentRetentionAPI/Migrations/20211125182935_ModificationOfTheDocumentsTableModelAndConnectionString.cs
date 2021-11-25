using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentRetentionAPI.Migrations
{
    public partial class ModificationOfTheDocumentsTableModelAndConnectionString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DocummentComment",
                table: "Documents",
                newName: "DocumentComment");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DocumentComment",
                table: "Documents",
                newName: "DocummentComment");
        }
    }
}
