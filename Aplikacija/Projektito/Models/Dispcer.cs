namespace Models
{
    public class Dispecer
    {
        [Key]
        public int ID { get; set; }
        [RegularExpression("^[a-zA-z]+$")]
        [StringLength(30, MinimumLength = 3)]
        public required string Ime { get; set; }
        [RegularExpression("^[a-zA-z]+$")]
        [StringLength(30, MinimumLength = 3)]
        public required string  Prezime { get; set; }

        [RegularExpression("^[0-9]+$")]
        [StringLength(13)]
        public required string JMBG { get; set; }
        [StringLength(30, MinimumLength=6)]
        [RegularExpression(@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")]
        public required string Email {get; set; }
        [MaxLength(20)]
        [RegularExpression("^[a-zA-Z][a-zA-Z0-9]*$")]
        public required string KorisnickoIme {get; set; }
        public required string Sifra { get; set; }

        public required string Slika { get; set;}

        [JsonIgnore]    
         public List<PonudjenaTura>? PonudjeneTure { get; set; }

    }
}