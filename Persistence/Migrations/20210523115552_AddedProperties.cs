using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddedProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DoctorPatients");

            migrationBuilder.DropColumn(
                name: "isRemoved",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "doctorId",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_doctorId",
                table: "AspNetUsers",
                column: "doctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_doctorId",
                table: "AspNetUsers",
                column: "doctorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_doctorId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_doctorId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "doctorId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<bool>(
                name: "isRemoved",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DoctorPatients",
                columns: table => new
                {
                    DoctorId = table.Column<string>(type: "TEXT", nullable: false),
                    PatientId = table.Column<string>(type: "TEXT", nullable: false),
                    isDoctor = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorPatients", x => new { x.DoctorId, x.PatientId });
                    table.ForeignKey(
                        name: "FK_DoctorPatients_AspNetUsers_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DoctorPatients_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DoctorPatients_PatientId",
                table: "DoctorPatients",
                column: "PatientId",
                unique: true);
        }
    }
}
