using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class HeightWeight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Heights",
                columns: table => new
                {
                    heightId = table.Column<Guid>(type: "TEXT", nullable: false),
                    myHeight = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Heights", x => x.heightId);
                });

            migrationBuilder.CreateTable(
                name: "Weights",
                columns: table => new
                {
                    weightId = table.Column<Guid>(type: "TEXT", nullable: false),
                    myWeight = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Weights", x => x.weightId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Heights");

            migrationBuilder.DropTable(
                name: "Weights");
        }
    }
}
