namespace Models
{

    public class Vozilo
    {
          [Key]
        public int ID { get; set; }
        [RegularExpression("^[0-9]+$")]
        public int CenaPoKilometru { get; set; }
        [MaxLength(15)]
        [RegularExpression("^[a-zA-z]+$")]
        public required string Marka { get; set; }
        [MaxLength(15)]
        [RegularExpression("^[a-zA-z]+$")]
        public required string Model { get; set; }

        public required string Slika { get; set; }
        [MaxLength(11)]
        public required string Tablice { get; set; }

        public Vozac? Vozac { get; set;}

        public List<PrihvacenaTura>? PrihvaceneTure{get; set;}
    }
}