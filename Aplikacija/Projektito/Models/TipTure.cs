namespace Models 
{

    public class TipTure{

        [Key]
        public required string Tip { get; set; }

        [JsonIgnore]
        public List<Tura>? Ture{get; set;}
    
    }
}