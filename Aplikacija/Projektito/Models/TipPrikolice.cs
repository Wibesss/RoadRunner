namespace Models 
{

    public class TipPrikolice{

        [Key]
        public required string Tip { get; set; }

        [JsonIgnore]
        public List<Tura>? Ture{get; set;}
    
    }
}