namespace Models
{
    public class Context:DbContext
    {
        public Context(DbContextOptions options):base(options){}
        public DbSet<Dispecer>? Dispecer{get; set;}
        public DbSet<Favorizacija>? Favorizacija{get; set;}
        public DbSet<Kompanija>? Kompanija{get; set;}
        public DbSet<Ocena>? Ocena{get; set;}
        public DbSet<PonudjenaTura>? PonudjenaTura{get; set;}
        public DbSet<PrihvacenaTura>? PrihvacenaTura{get; set;}
        public DbSet<Prikolica>? Prikolica{get; set;}
        public DbSet<Tura>? Tura{get; set;}
        public DbSet<Vozac>? Vozac{get; set;}
        public DbSet<Vozilo>? Vozilo{get; set;}
        public DbSet<DodeljenaTuraa>? DodeljeneTure{get; set;}
    }

}