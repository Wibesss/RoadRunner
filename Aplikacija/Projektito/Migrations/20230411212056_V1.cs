using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Projektito.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dispeceri",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    JMBG = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sifra = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dispeceri", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kompanije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Sifra = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Vlasnik = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kompanije", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Vozaci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    JMBG = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sifra = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vozaci", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Favorizacije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VozacID = table.Column<int>(type: "int", nullable: true),
                    KompanijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorizacije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Favorizacije_Kompanije_KompanijaID",
                        column: x => x.KompanijaID,
                        principalTable: "Kompanije",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Favorizacije_Vozaci_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Ocene",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Broj = table.Column<int>(type: "int", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    KompanijaID = table.Column<int>(type: "int", nullable: true),
                    VozacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ocene", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Ocene_Kompanije_KompanijaID",
                        column: x => x.KompanijaID,
                        principalTable: "Kompanije",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Ocene_Vozaci_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Prikolice",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zapremina = table.Column<double>(type: "float", nullable: false),
                    Duzina = table.Column<double>(type: "float", nullable: false),
                    Sirina = table.Column<double>(type: "float", nullable: false),
                    Visina = table.Column<double>(type: "float", nullable: false),
                    Nosivost = table.Column<double>(type: "float", nullable: false),
                    Tablice = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VozacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prikolice", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Prikolice_Vozaci_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Ture",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TipRobe = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    TezinaRobe = table.Column<double>(type: "float", nullable: false),
                    DuzinaRobe = table.Column<double>(type: "float", nullable: false),
                    SirinaRobe = table.Column<double>(type: "float", nullable: false),
                    VisinaRobe = table.Column<double>(type: "float", nullable: false),
                    Zapremina = table.Column<double>(type: "float", nullable: false),
                    PoctnaGeografskaSirina = table.Column<double>(type: "float", nullable: false),
                    PocetnaGeografskaDuzina = table.Column<double>(type: "float", nullable: false),
                    OdredisnaGeografskaSirina = table.Column<double>(type: "float", nullable: false),
                    OdredisnaGeografskaDuzina = table.Column<double>(type: "float", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DatumPocetka = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PredvidjeniKraj = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KompanijaID = table.Column<int>(type: "int", nullable: true),
                    VozacID = table.Column<int>(type: "int", nullable: true),
                    VozacID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ture", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Ture_Kompanije_KompanijaID",
                        column: x => x.KompanijaID,
                        principalTable: "Kompanije",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Ture_Vozaci_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozaci",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Ture_Vozaci_VozacID1",
                        column: x => x.VozacID1,
                        principalTable: "Vozaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Vozila",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CenaPoKilometru = table.Column<int>(type: "int", nullable: false),
                    Marka = table.Column<int>(type: "int", nullable: false),
                    Model = table.Column<int>(type: "int", nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tablice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VozacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vozila", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Vozila_Vozaci_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "PonudjeneTure",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TuraID = table.Column<int>(type: "int", nullable: true),
                    VozacID = table.Column<int>(type: "int", nullable: true),
                    DispecerID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PonudjeneTure", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PonudjeneTure_Dispeceri_DispecerID",
                        column: x => x.DispecerID,
                        principalTable: "Dispeceri",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PonudjeneTure_Ture_TuraID",
                        column: x => x.TuraID,
                        principalTable: "Ture",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PonudjeneTure_Vozaci_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozaci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "PrihvaceneTure",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TuraID = table.Column<int>(type: "int", nullable: true),
                    VozacID = table.Column<int>(type: "int", nullable: true),
                    VoziloID = table.Column<int>(type: "int", nullable: true),
                    GenerisanaCena = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrihvaceneTure", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PrihvaceneTure_Ture_TuraID",
                        column: x => x.TuraID,
                        principalTable: "Ture",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PrihvaceneTure_Vozaci_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozaci",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PrihvaceneTure_Vozila_VoziloID",
                        column: x => x.VoziloID,
                        principalTable: "Vozila",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Favorizacije_KompanijaID",
                table: "Favorizacije",
                column: "KompanijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Favorizacije_VozacID",
                table: "Favorizacije",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_Ocene_KompanijaID",
                table: "Ocene",
                column: "KompanijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Ocene_VozacID",
                table: "Ocene",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_PonudjeneTure_DispecerID",
                table: "PonudjeneTure",
                column: "DispecerID");

            migrationBuilder.CreateIndex(
                name: "IX_PonudjeneTure_TuraID",
                table: "PonudjeneTure",
                column: "TuraID");

            migrationBuilder.CreateIndex(
                name: "IX_PonudjeneTure_VozacID",
                table: "PonudjeneTure",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_PrihvaceneTure_TuraID",
                table: "PrihvaceneTure",
                column: "TuraID");

            migrationBuilder.CreateIndex(
                name: "IX_PrihvaceneTure_VozacID",
                table: "PrihvaceneTure",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_PrihvaceneTure_VoziloID",
                table: "PrihvaceneTure",
                column: "VoziloID");

            migrationBuilder.CreateIndex(
                name: "IX_Prikolice_VozacID",
                table: "Prikolice",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_Ture_KompanijaID",
                table: "Ture",
                column: "KompanijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Ture_VozacID",
                table: "Ture",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_Ture_VozacID1",
                table: "Ture",
                column: "VozacID1");

            migrationBuilder.CreateIndex(
                name: "IX_Vozila_VozacID",
                table: "Vozila",
                column: "VozacID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favorizacije");

            migrationBuilder.DropTable(
                name: "Ocene");

            migrationBuilder.DropTable(
                name: "PonudjeneTure");

            migrationBuilder.DropTable(
                name: "PrihvaceneTure");

            migrationBuilder.DropTable(
                name: "Prikolice");

            migrationBuilder.DropTable(
                name: "Dispeceri");

            migrationBuilder.DropTable(
                name: "Ture");

            migrationBuilder.DropTable(
                name: "Vozila");

            migrationBuilder.DropTable(
                name: "Kompanije");

            migrationBuilder.DropTable(
                name: "Vozaci");
        }
    }
}
