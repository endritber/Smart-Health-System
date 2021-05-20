using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PatientwithUserColumnChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatientInfos_AspNetUsers_AppUserRef",
                table: "PatientInfos");

            migrationBuilder.RenameColumn(
                name: "AppUserRef",
                table: "PatientInfos",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_PatientInfos_AppUserRef",
                table: "PatientInfos",
                newName: "IX_PatientInfos_userId");

            migrationBuilder.AddColumn<string>(
                name: "HostUser",
                table: "PatientInfos",
                type: "text",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_PatientInfos_AspNetUsers_userId",
                table: "PatientInfos",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatientInfos_AspNetUsers_userId",
                table: "PatientInfos");

            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "PatientInfos");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "PatientInfos",
                newName: "AppUserRef");

            migrationBuilder.RenameIndex(
                name: "IX_PatientInfos_userId",
                table: "PatientInfos",
                newName: "IX_PatientInfos_AppUserRef");

            migrationBuilder.AddForeignKey(
                name: "FK_PatientInfos_AspNetUsers_AppUserRef",
                table: "PatientInfos",
                column: "AppUserRef",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
