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
                name: "Dispecer",
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
                    table.PrimaryKey("PK_Dispecer", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kompanija",
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
                    table.PrimaryKey("PK_Kompanija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Vozac",
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
                    table.PrimaryKey("PK_Vozac", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Tura",
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
                    KompanijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tura", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Tura_Kompanija_KompanijaID",
                        column: x => x.KompanijaID,
                        principalTable: "Kompanija",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Favorizacija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VozacID = table.Column<int>(type: "int", nullable: true),
                    KompanijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorizacija", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Favorizacija_Kompanija_KompanijaID",
                        column: x => x.KompanijaID,
                        principalTable: "Kompanija",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Favorizacija_Vozac_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozac",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Ocena",
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
                    table.PrimaryKey("PK_Ocena", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Ocena_Kompanija_KompanijaID",
                        column: x => x.KompanijaID,
                        principalTable: "Kompanija",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Ocena_Vozac_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozac",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Prikolica",
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
                    table.PrimaryKey("PK_Prikolica", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Prikolica_Vozac_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozac",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Vozilo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CenaPoKilometru = table.Column<int>(type: "int", nullable: false),
                    Marka = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tablice = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    VozacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vozilo", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Vozilo_Vozac_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozac",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "PonudjenaTura",
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
                    table.PrimaryKey("PK_PonudjenaTura", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PonudjenaTura_Dispecer_DispecerID",
                        column: x => x.DispecerID,
                        principalTable: "Dispecer",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PonudjenaTura_Tura_TuraID",
                        column: x => x.TuraID,
                        principalTable: "Tura",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PonudjenaTura_Vozac_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozac",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "DodeljeneTure",
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
                    table.PrimaryKey("PK_DodeljeneTure", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DodeljeneTure_Tura_TuraID",
                        column: x => x.TuraID,
                        principalTable: "Tura",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_DodeljeneTure_Vozac_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozac",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_DodeljeneTure_Vozilo_VoziloID",
                        column: x => x.VoziloID,
                        principalTable: "Vozilo",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "PrihvacenaTura",
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
                    table.PrimaryKey("PK_PrihvacenaTura", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PrihvacenaTura_Tura_TuraID",
                        column: x => x.TuraID,
                        principalTable: "Tura",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PrihvacenaTura_Vozac_VozacID",
                        column: x => x.VozacID,
                        principalTable: "Vozac",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_PrihvacenaTura_Vozilo_VoziloID",
                        column: x => x.VoziloID,
                        principalTable: "Vozilo",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DodeljeneTure_TuraID",
                table: "DodeljeneTure",
                column: "TuraID");

            migrationBuilder.CreateIndex(
                name: "IX_DodeljeneTure_VozacID",
                table: "DodeljeneTure",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_DodeljeneTure_VoziloID",
                table: "DodeljeneTure",
                column: "VoziloID");

            migrationBuilder.CreateIndex(
                name: "IX_Favorizacija_KompanijaID",
                table: "Favorizacija",
                column: "KompanijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Favorizacija_VozacID",
                table: "Favorizacija",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_Ocena_KompanijaID",
                table: "Ocena",
                column: "KompanijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Ocena_VozacID",
                table: "Ocena",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_PonudjenaTura_DispecerID",
                table: "PonudjenaTura",
                column: "DispecerID");

            migrationBuilder.CreateIndex(
                name: "IX_PonudjenaTura_TuraID",
                table: "PonudjenaTura",
                column: "TuraID");

            migrationBuilder.CreateIndex(
                name: "IX_PonudjenaTura_VozacID",
                table: "PonudjenaTura",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_PrihvacenaTura_TuraID",
                table: "PrihvacenaTura",
                column: "TuraID");

            migrationBuilder.CreateIndex(
                name: "IX_PrihvacenaTura_VozacID",
                table: "PrihvacenaTura",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_PrihvacenaTura_VoziloID",
                table: "PrihvacenaTura",
                column: "VoziloID");

            migrationBuilder.CreateIndex(
                name: "IX_Prikolica_VozacID",
                table: "Prikolica",
                column: "VozacID");

            migrationBuilder.CreateIndex(
                name: "IX_Tura_KompanijaID",
                table: "Tura",
                column: "KompanijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Vozilo_VozacID",
                table: "Vozilo",
                column: "VozacID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DodeljeneTure");

            migrationBuilder.DropTable(
                name: "Favorizacija");

            migrationBuilder.DropTable(
                name: "Ocena");

            migrationBuilder.DropTable(
                name: "PonudjenaTura");

            migrationBuilder.DropTable(
                name: "PrihvacenaTura");

            migrationBuilder.DropTable(
                name: "Prikolica");

            migrationBuilder.DropTable(
                name: "Dispecer");

            migrationBuilder.DropTable(
                name: "Tura");

            migrationBuilder.DropTable(
                name: "Vozilo");

            migrationBuilder.DropTable(
                name: "Kompanija");

            migrationBuilder.DropTable(
                name: "Vozac");
        }
    }
}
