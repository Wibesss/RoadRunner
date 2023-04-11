namespace Models
{

    public class Tura{

        [Key]
        public int ID { get; set; }

        [MaxLength(30)]
        public required string TipRobe { get; set; }
        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]
        public double TezinaRobe { get; set; }
        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]
        public double DuzinaRobe { get; set; }
        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]
        public double SirinaRobe { get; set; }

        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]
        public double VisinaRobe { get; set; }
        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]
        public double Zapremina { get; set; }
        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]
        public double PoctnaGeografskaSirina { get; set; }
        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]

        public double PocetnaGeografskaDuzina { get; set; }
        
        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]
        public double OdredisnaGeografskaSirina { get; set; }

        [RegularExpression(@"^(0*[1-9]\d{0,15}|0+)(\.\d\d)?$")]
        public double OdredisnaGeografskaDuzina { get; set; }
        [MaxLength(20)]
        public required string Status { get; set; }

        public required DateTime DatumPocetka { get; set; }

        public DateTime PredvidjeniKraj { get; set; }
        public Kompanija? Kompanija { get; set; }

        


    }
}