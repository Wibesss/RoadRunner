namespace Models
{
    public class PonudjenaTura
    {

        [Key]
        public int ID { get; set; }

        public Tura? Tura { get; set; }

        public Vozac? Vozac { get; set; }

        public  Dispecer? Dispecer  { get; set; }

    }
}