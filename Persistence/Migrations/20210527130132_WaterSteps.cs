using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class WaterSteps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stepss",
                columns: table => new
                {
                    stepsId = table.Column<Guid>(type: "TEXT", nullable: false),
                    mySteps = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stepss", x => x.stepsId);
                });

            migrationBuilder.CreateTable(
                name: "WaterIntakes",
                columns: table => new
                {
                    waterId = table.Column<Guid>(type: "TEXT", nullable: false),
                    literPerHour = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WaterIntakes", x => x.waterId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stepss");

            migrationBuilder.DropTable(
                name: "WaterIntakes");
        }
    }
}
