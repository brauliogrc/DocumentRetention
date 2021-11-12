using Microsoft.EntityFrameworkCore.Migrations;

namespace DocumentRetentionAPI.Migrations
{
    public partial class ModifyTableDocuments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DocumentPath",
                table: "Documents",
                type: "nvarchar(280)",
                maxLength: 280,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ownerEmployNum",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "ownerName",
                table: "Documents");

            migrationBuilder.AlterColumn<string>(
                name: "DocumentPath",
                table: "Documents",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(280)",
                oldMaxLength: 280);
        }
    }
}
