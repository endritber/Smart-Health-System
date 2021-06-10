using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AppointmentsRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_AspNetUsers_doctorNameId",
                table: "Appointments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Appointments",
                table: "Appointments");

            migrationBuilder.RenameColumn(
                name: "doctorNameId",
                table: "Appointments",
                newName: "patientId");

            migrationBuilder.RenameColumn(
                name: "dateOfAppointment",
                table: "Appointments",
                newName: "Place");

            migrationBuilder.RenameColumn(
                name: "AppointmentId",
                table: "Appointments",
                newName: "Date");

            migrationBuilder.RenameIndex(
                name: "IX_Appointments_doctorNameId",
                table: "Appointments",
                newName: "IX_Appointments_patientId");

            migrationBuilder.AddColumn<string>(
                name: "patientId",
                table: "Vitals",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Appointments",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "ReasonOfVisit",
                table: "Appointments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "doctorId",
                table: "Appointments",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Appointments",
                table: "Appointments",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Vitals_patientId",
                table: "Vitals",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_doctorId",
                table: "Appointments",
                column: "doctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_AspNetUsers_doctorId",
                table: "Appointments",
                column: "doctorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_AspNetUsers_patientId",
                table: "Appointments",
                column: "patientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vitals_AspNetUsers_patientId",
                table: "Vitals",
                column: "patientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_AspNetUsers_doctorId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_AspNetUsers_patientId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Vitals_AspNetUsers_patientId",
                table: "Vitals");

            migrationBuilder.DropIndex(
                name: "IX_Vitals_patientId",
                table: "Vitals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Appointments",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_doctorId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "patientId",
                table: "Vitals");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "ReasonOfVisit",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "doctorId",
                table: "Appointments");

            migrationBuilder.RenameColumn(
                name: "patientId",
                table: "Appointments",
                newName: "doctorNameId");

            migrationBuilder.RenameColumn(
                name: "Place",
                table: "Appointments",
                newName: "dateOfAppointment");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Appointments",
                newName: "AppointmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Appointments_patientId",
                table: "Appointments",
                newName: "IX_Appointments_doctorNameId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Appointments",
                table: "Appointments",
                column: "AppointmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_AspNetUsers_doctorNameId",
                table: "Appointments",
                column: "doctorNameId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
