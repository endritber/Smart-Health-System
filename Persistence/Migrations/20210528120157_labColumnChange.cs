using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class labColumnChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LabResults_AspNetUsers_doctorId",
                table: "LabResults");

            migrationBuilder.DropForeignKey(
                name: "FK_LabResults_AspNetUsers_patientId",
                table: "LabResults");

            migrationBuilder.DropIndex(
                name: "IX_LabResults_doctorId",
                table: "LabResults");

            migrationBuilder.RenameColumn(
                name: "patientId",
                table: "LabResults",
                newName: "PatientId");

            migrationBuilder.RenameColumn(
                name: "doctorId",
                table: "LabResults",
                newName: "patient");

            migrationBuilder.RenameIndex(
                name: "IX_LabResults_patientId",
                table: "LabResults",
                newName: "IX_LabResults_PatientId");

            migrationBuilder.AddColumn<string>(
                name: "doctor",
                table: "LabResults",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LabResults_AspNetUsers_PatientId",
                table: "LabResults",
                column: "PatientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LabResults_AspNetUsers_PatientId",
                table: "LabResults");

            migrationBuilder.DropColumn(
                name: "doctor",
                table: "LabResults");

            migrationBuilder.RenameColumn(
                name: "PatientId",
                table: "LabResults",
                newName: "patientId");

            migrationBuilder.RenameColumn(
                name: "patient",
                table: "LabResults",
                newName: "doctorId");

            migrationBuilder.RenameIndex(
                name: "IX_LabResults_PatientId",
                table: "LabResults",
                newName: "IX_LabResults_patientId");

            migrationBuilder.CreateIndex(
                name: "IX_LabResults_doctorId",
                table: "LabResults",
                column: "doctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_LabResults_AspNetUsers_doctorId",
                table: "LabResults",
                column: "doctorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LabResults_AspNetUsers_patientId",
                table: "LabResults",
                column: "patientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
