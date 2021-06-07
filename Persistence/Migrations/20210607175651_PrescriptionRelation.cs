using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PrescriptionRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "patientId",
                table: "Weights",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "patientId",
                table: "WaterIntakes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "doctorId",
                table: "Prescriptions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "patientId",
                table: "Prescriptions",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "patientId",
                table: "Heights",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Vitalss",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    heartRate = table.Column<int>(type: "INTEGER", nullable: false),
                    bodyTemperature = table.Column<double>(type: "REAL", nullable: false),
                    bloodPressure = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vitalss", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Weights_patientId",
                table: "Weights",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_WaterIntakes_patientId",
                table: "WaterIntakes",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_doctorId",
                table: "Prescriptions",
                column: "doctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_patientId",
                table: "Prescriptions",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_Heights_patientId",
                table: "Heights",
                column: "patientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Heights_AspNetUsers_patientId",
                table: "Heights",
                column: "patientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_AspNetUsers_doctorId",
                table: "Prescriptions",
                column: "doctorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_AspNetUsers_patientId",
                table: "Prescriptions",
                column: "patientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WaterIntakes_AspNetUsers_patientId",
                table: "WaterIntakes",
                column: "patientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Weights_AspNetUsers_patientId",
                table: "Weights",
                column: "patientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Heights_AspNetUsers_patientId",
                table: "Heights");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_AspNetUsers_doctorId",
                table: "Prescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_AspNetUsers_patientId",
                table: "Prescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_WaterIntakes_AspNetUsers_patientId",
                table: "WaterIntakes");

            migrationBuilder.DropForeignKey(
                name: "FK_Weights_AspNetUsers_patientId",
                table: "Weights");

            migrationBuilder.DropTable(
                name: "Vitalss");

            migrationBuilder.DropIndex(
                name: "IX_Weights_patientId",
                table: "Weights");

            migrationBuilder.DropIndex(
                name: "IX_WaterIntakes_patientId",
                table: "WaterIntakes");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_doctorId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_patientId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Heights_patientId",
                table: "Heights");

            migrationBuilder.DropColumn(
                name: "patientId",
                table: "Weights");

            migrationBuilder.DropColumn(
                name: "patientId",
                table: "WaterIntakes");

            migrationBuilder.DropColumn(
                name: "doctorId",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "patientId",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "patientId",
                table: "Heights");
        }
    }
}
