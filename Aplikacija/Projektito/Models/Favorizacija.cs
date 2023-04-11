namespace Models{

     public class Favorizacija
     {
        [Key]
        public int ID { get; set; }

        public Vozac? Vozac { get; set;}
        public Kompanija? Kompanija { get; set; }
        
     }
}