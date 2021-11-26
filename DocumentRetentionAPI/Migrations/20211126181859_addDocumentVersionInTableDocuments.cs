using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentRetentionAPI.Migrations
{
    public partial class addDocumentVersionInTableDocuments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DocumentVersion",
                table: "Documents",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentVersion",
                table: "Documents");
        }
    }
}
