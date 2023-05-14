namespace Models
{
    public class Kompanija
    {
        [Key]
        public int ID{ get; set; }
        [MaxLength(20)]
        [RegularExpression("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")]
        public required string Naziv { get; set; }
        [RegularExpression(@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")]
        public required string Email { get; set; }
        [MaxLength(20)]
        [RegularExpression("^[a-zA-Z][a-zA-Z0-9]*$")]
        public required string KorisnickoIme { get; set; }
        public required string Sifra { get; set; }
        [MaxLength(40)]
        public required string Adresa { get; set; }
        [MaxLength(40)]
        [RegularExpression("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")]
        public required string Vlasnik { get; set; }
        public required string Logo { get; set; }
       
        public List<Favorizacija>? Favorizacije { get; set; }
        [JsonIgnore]
        public List<Tura>? Ture { get; set; }
       
        public List<Ocena>? Ocene { get; set; }

    } 
}