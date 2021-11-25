using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentRetentionAPI.Migrations
{
    public partial class DocumentTableModificationAndConnectionString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DocummentComment",
                table: "Documents",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocummentComment",
                table: "Documents");
        }
    }
}
