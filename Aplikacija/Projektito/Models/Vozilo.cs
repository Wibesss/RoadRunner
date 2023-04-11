namespace Models
{

    public class Vozilo
    {
        [Key]
        public int ID { get; set; }

        public int CenaPoKilometru { get; set; }

        public int Marka { get; set; }

        public int Model { get; set; }

        public required string Slika { get; set; }

        public required string Tablice { get; set; }

        public Vozac? Vozac { get; set;}

        public List<PrihvacenaTura> PrihvaceneTure{get; set;}
    }
}