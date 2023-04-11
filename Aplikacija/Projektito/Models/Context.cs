namespace Models
{
    public class Context:DbContext
    {
        public Context(DbContextOptions options):base(options){}
        public DbSet<Dispecer>? Dispeceri{get; set;}
        public DbSet<Favorizacija>? Favorizacije{get; set;}
        public DbSet<Kompanija>? Kompanije{get; set;}
        public DbSet<Ocena>? Ocene{get; set;}
        public DbSet<PonudjenaTura>? PonudjeneTure{get; set;}
        public DbSet<PrihvacenaTura>? PrihvaceneTure{get; set;}
        public DbSet<Prikolica>? Prikolice{get; set;}
        public DbSet<Tura>? Ture{get; set;}
        public DbSet<Vozac>? Vozaci{get; set;}
        public DbSet<Vozilo>? Vozila{get; set;}

    }

}