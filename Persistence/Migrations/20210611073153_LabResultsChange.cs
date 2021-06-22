using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class LabResultsChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LabResults");

            migrationBuilder.AlterColumn<string>(
                name: "Place",
                table: "Appointments",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.CreateTable(
                name: "CBCs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    WBC = table.Column<float>(type: "REAL", nullable: false),
                    SegmentedNeutrofilis = table.Column<float>(type: "REAL", nullable: false),
                    BandForms = table.Column<float>(type: "REAL", nullable: false),
                    Lymphocytes = table.Column<float>(type: "REAL", nullable: false),
                    Monocytes = table.Column<float>(type: "REAL", nullable: false),
                    Basoghilis = table.Column<float>(type: "REAL", nullable: false),
                    Hemoglobin = table.Column<float>(type: "REAL", nullable: false),
                    Hematocrit = table.Column<float>(type: "REAL", nullable: false),
                    PlateletCount = table.Column<float>(type: "REAL", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    doctorId = table.Column<string>(type: "TEXT", nullable: true),
                    patientId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CBCs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CBCs_AspNetUsers_doctorId",
                        column: x => x.doctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CBCs_AspNetUsers_patientId",
                        column: x => x.patientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LiverPanels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TotalBiliRubin = table.Column<float>(type: "REAL", nullable: false),
                    DirectBiliRubin = table.Column<float>(type: "REAL", nullable: false),
                    SGOT = table.Column<float>(type: "REAL", nullable: false),
                    SGPT = table.Column<float>(type: "REAL", nullable: false),
                    AlkalinePhosPhatase = table.Column<float>(type: "REAL", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    doctorId = table.Column<string>(type: "TEXT", nullable: true),
                    patientId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiverPanels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LiverPanels_AspNetUsers_doctorId",
                        column: x => x.doctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LiverPanels_AspNetUsers_patientId",
                        column: x => x.patientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MetabolicPanels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Glucose = table.Column<float>(type: "REAL", nullable: false),
                    Bun = table.Column<float>(type: "REAL", nullable: false),
                    Protein = table.Column<float>(type: "REAL", nullable: false),
                    Albumin = table.Column<float>(type: "REAL", nullable: false),
                    Calcium = table.Column<float>(type: "REAL", nullable: false),
                    Globulin = table.Column<float>(type: "REAL", nullable: false),
                    CarbonDioxide = table.Column<float>(type: "REAL", nullable: false),
                    date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    doctorId = table.Column<string>(type: "TEXT", nullable: true),
                    patientId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetabolicPanels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetabolicPanels_AspNetUsers_doctorId",
                        column: x => x.doctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MetabolicPanels_AspNetUsers_patientId",
                        column: x => x.patientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UrinalysisList",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Sodium = table.Column<float>(type: "REAL", nullable: false),
                    Potassium = table.Column<float>(type: "REAL", nullable: false),
                    Chloride = table.Column<float>(type: "REAL", nullable: false),
                    HCO3 = table.Column<float>(type: "REAL", nullable: false),
                    Creatinine = table.Column<float>(type: "REAL", nullable: false),
                    BloodUreaNitrogen = table.Column<float>(type: "REAL", nullable: false),
                    FastingGlucose = table.Column<float>(type: "REAL", nullable: false),
                    Calcium = table.Column<float>(type: "REAL", nullable: false),
                    Magnesium = table.Column<float>(type: "REAL", nullable: false),
                    Phosphate = table.Column<float>(type: "REAL", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    doctorId = table.Column<string>(type: "TEXT", nullable: true),
                    patientId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UrinalysisList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UrinalysisList_AspNetUsers_doctorId",
                        column: x => x.doctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UrinalysisList_AspNetUsers_patientId",
                        column: x => x.patientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CBCs_doctorId",
                table: "CBCs",
                column: "doctorId");

            migrationBuilder.CreateIndex(
                name: "IX_CBCs_patientId",
                table: "CBCs",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_LiverPanels_doctorId",
                table: "LiverPanels",
                column: "doctorId");

            migrationBuilder.CreateIndex(
                name: "IX_LiverPanels_patientId",
                table: "LiverPanels",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_MetabolicPanels_doctorId",
                table: "MetabolicPanels",
                column: "doctorId");

            migrationBuilder.CreateIndex(
                name: "IX_MetabolicPanels_patientId",
                table: "MetabolicPanels",
                column: "patientId");

            migrationBuilder.CreateIndex(
                name: "IX_UrinalysisList_doctorId",
                table: "UrinalysisList",
                column: "doctorId");

            migrationBuilder.CreateIndex(
                name: "IX_UrinalysisList_patientId",
                table: "UrinalysisList",
                column: "patientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CBCs");

            migrationBuilder.DropTable(
                name: "LiverPanels");

            migrationBuilder.DropTable(
                name: "MetabolicPanels");

            migrationBuilder.DropTable(
                name: "UrinalysisList");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Place",
                table: "Appointments",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "LabResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ProblemProportion = table.Column<string>(type: "TEXT", nullable: true),
                    Result = table.Column<string>(type: "TEXT", nullable: true),
                    ResultProportion = table.Column<string>(type: "TEXT", nullable: true),
                    Sample = table.Column<string>(type: "TEXT", nullable: true),
                    doctorId = table.Column<string>(type: "TEXT", nullable: true),
                    patientId = table.Column<string>(type: "TEXT", nullable: true),
                    status = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LabResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LabResults_AspNetUsers_doctorId",
                        column: x => x.doctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LabResults_AspNetUsers_patientId",
                        column: x => x.patientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LabResults_doctorId",
                table: "LabResults",
                column: "doctorId");

            migrationBuilder.CreateIndex(
                name: "IX_LabResults_patientId",
                table: "LabResults",
                column: "patientId");
        }
    }
}
