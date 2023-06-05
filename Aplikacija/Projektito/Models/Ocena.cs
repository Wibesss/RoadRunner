namespace Models{

    public class Ocena{
        
        [Key]
        public int ID { get; set; }
        [Range(1,5)]
        public int Broj {get; set;}
        [MaxLength(300)]
        public required string Opis { get; set; }
        public Kompanija? Kompanija { get; set; }
        public Vozac? Vozac { get; set; }
        

    }
}