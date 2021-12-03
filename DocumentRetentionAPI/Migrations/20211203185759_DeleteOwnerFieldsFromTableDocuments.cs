using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentRetentionAPI.Migrations
{
    public partial class DeleteOwnerFieldsFromTableDocuments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ownerEmployNum",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "ownerName",
                table: "Documents");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ownerEmployNum",
                table: "Documents",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "ownerName",
                table: "Documents",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: false,
                defaultValue: "");
        }
    }
}
