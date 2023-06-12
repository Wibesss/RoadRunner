using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace Projektito.Controllers;


[ApiController]
[Route("[controller]")]
public class KompanijaController : ControllerBase
{
   
  public Context Context { get; set; }
  public KompanijaController(Context context)
  {
    Context=context;
  }
  [AllowAnonymous]
  [Route("AddKompanija")]
  [HttpPost]
  public async Task<IActionResult> AddKompanija([FromBody]Kompanija komp)
  {
    try{
        if(komp.Naziv.Length<1 || komp.Naziv.Length>20 || Regex.IsMatch(komp.Naziv,"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")==false)
            ModelState.AddModelError("Naziv", "Naziv treba da ima između 1 i 20 karaktera.");
        if(komp.Email.Length<1 || Regex.IsMatch(komp.Email,@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")==false)
            ModelState.AddModelError("Email", "Email treba da bude između 6 i 30 karaktera i u validnom formatu.");
        if(komp.KorisnickoIme.Length<1 || komp.KorisnickoIme.Length>20 || Regex.IsMatch(komp.KorisnickoIme,"^[a-zA-Z][a-zA-Z0-9]*$")==false)
            ModelState.AddModelError("KorisnickoIme", "Korisničko ime treba da ima između 1 i 20 karaktera i može sadržati samo slovne karaktere i brojeve.");
        if(komp.Sifra.Length<1 || komp.Sifra.Length>20 || Regex.IsMatch(komp.Sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
            ModelState.AddModelError("Sifra", "Sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
        if(komp.Adresa.Length<1 || komp.Adresa.Length>40)
            ModelState.AddModelError("Adresa", "Adresa treba da ima između 1 i 40 karaktera.");
        if(komp.Vlasnik.Length<1 || komp.Vlasnik.Length>40 || Regex.IsMatch(komp.Vlasnik,"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")==false)
            ModelState.AddModelError("Vlasnik", "Vlasnik treba da ima između 1 i 40 karaktera.");
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        string sifra= BCrypt.Net.BCrypt.HashPassword(komp.Sifra,10);
        komp.Sifra=sifra;    
        var KompanijaEmail = Context.Kompanija!.Where( p => p.Email == komp.Email).FirstOrDefault();
        var KompanijaUsername = Context.Kompanija!.Where( p => p.KorisnickoIme == komp.KorisnickoIme).FirstOrDefault();
        var VozacEmail = Context.Vozac!.Where(p => p.Email == komp.Email).FirstOrDefault();
        var VozacUsername = Context.Vozac!.Where(p=>p.KorisnickoIme == komp.KorisnickoIme).FirstOrDefault();
        var DispecerEmail = Context.Dispecer!.Where(p=>p.Email == komp.Email).FirstOrDefault();
        var DispecerUsername = Context.Dispecer!.Where(p=>p.KorisnickoIme == komp.KorisnickoIme).FirstOrDefault();
        if(KompanijaEmail!=null || VozacEmail!=null || DispecerEmail!=null)
            return BadRequest("Vec postoji nalog sa tim emailom");
        if(KompanijaUsername!= null || VozacUsername!= null || DispecerUsername!= null)
            return BadRequest("Vec postoji nalog sa tim korisnickim imenom");
        Context.Kompanija!.Add(komp);
        await Context.SaveChangesAsync();
         return Ok(new { message = "Kompanija dodata" });
    }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
}
    [Authorize(Roles ="Kompanija")]
    [Route("UpdateKompanija/{id}")]
    [HttpPut]
    public async Task<IActionResult> UpdateKompanija ([FromBody]Kompanija komp,int id)
    {
        
        try{
            var Kompanija = Context.Kompanija!.Find(id);
            if(Kompanija!=null)
            {
                if(komp.Naziv.Length<1 || komp.Naziv.Length>20 || Regex.IsMatch(komp.Naziv,"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")==false)
                    ModelState.AddModelError("Naziv", "Naziv treba da ima između 1 i 20 karaktera.");
                if(komp.Email.Length<1 || Regex.IsMatch(komp.Email,@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")==false)
                    ModelState.AddModelError("Email", "Email treba da bude između 6 i 30 karaktera i u validnom formatu.");
                if(komp.KorisnickoIme.Length<1 || komp.KorisnickoIme.Length>20 || Regex.IsMatch(komp.KorisnickoIme,"^[a-zA-Z][a-zA-Z0-9]*$")==false)
                    ModelState.AddModelError("KorisnickoIme", "Korisničko ime treba da ima između 1 i 20 karaktera i može sadržati samo slovne karaktere i brojeve.");
                if(komp.Adresa.Length<1 || komp.Adresa.Length>40)
                    ModelState.AddModelError("Adresa", "Adresa treba da ima između 1 i 40 karaktera.");
                if(komp.Vlasnik.Length<1 || komp.Vlasnik.Length>40 || Regex.IsMatch(komp.Vlasnik,"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")==false)
                    ModelState.AddModelError("Vlasnik", "Vlasnik treba da ima između 1 i 40 karaktera.");
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                if( komp.Email != Kompanija.Email)
                {
                    var KompanijaEmail = Context.Kompanija.Where( p => p.Email == komp.Email).FirstOrDefault();
                    var VozacEmail = Context.Vozac!.Where(p => p.Email == komp.Email).FirstOrDefault();
                    var DispecerEmail = Context.Dispecer!.Where(p=>p.Email == komp.Email).FirstOrDefault();
                    if(KompanijaEmail!=null || VozacEmail!=null || DispecerEmail!=null)
                        return BadRequest("Vec postoji nalog sa tim emailom");
                }
                else if ( komp.KorisnickoIme!= Kompanija.KorisnickoIme)
                {
                    var VozacUsername = Context.Vozac!.Where(p=>p.KorisnickoIme == komp.KorisnickoIme).FirstOrDefault();
                    var KompanijaUsername = Context.Kompanija.Where( p => p.KorisnickoIme == komp.KorisnickoIme).FirstOrDefault();
                    var DispecerUsername = Context.Dispecer!.Where(p=>p.KorisnickoIme == komp.KorisnickoIme).FirstOrDefault();
                    if(KompanijaUsername!= null || VozacUsername!= null || DispecerUsername!= null)
                        return BadRequest("Vec postoji nalog sa tim korisnickim imenom");
                }
                Kompanija.Naziv=komp.Naziv;
                Kompanija.Email=komp.Email;
                Kompanija.KorisnickoIme=komp.KorisnickoIme;
                Kompanija.Adresa=komp.Adresa;
                Kompanija.Vlasnik=komp.Vlasnik;
                Kompanija.Logo=komp.Logo;
                Context.Kompanija.Update(Kompanija);
                await Context.SaveChangesAsync();
                return Ok($"Kompanija izmenjena");
            }
            else
            {
                return BadRequest("Kompanija nije pronadjena u bazi");
            }
        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
    }
    [Authorize(Roles ="Dispecer")]
    [Route("DeleteKompanija/{id}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteKompanija (int id)
    {
        try{
             var Kompanija = Context.Kompanija!.Find(id);
             if(Kompanija!=null)
             {
                var ture=await Context.Tura!.Where(p=>p.Kompanija==Kompanija).ToListAsync();
                var ocene=await Context.Ocena!.Where(p=>p.Kompanija==Kompanija).ToListAsync();
                var favorizacije=await Context.Favorizacija!.Where(p=>p.Kompanija==Kompanija).ToListAsync();
                foreach(var t in ture)
                {
                var ponudjene=await Context.PonudjenaTura!.Where(p=>p.Tura==t).ToListAsync();
                var prihvacena=await Context.PrihvacenaTura!.Where(p=>p.Tura==t).ToListAsync();
                var dodeljena= await Context.DodeljeneTure!.Where(p=>p.Tura==t).ToListAsync();

                foreach(var p in ponudjene)
                    Context.Remove(p);
                foreach(var p in prihvacena)
                    Context.Remove(p);
                foreach(var p in dodeljena)
                    Context.Remove(p);

                await Context.SaveChangesAsync();
                }
                  foreach(var f in favorizacije)
                {
                    Context.Remove(f);
                }
                await Context.SaveChangesAsync();

                 foreach(var f in ocene)
                {
                    Context.Remove(f);
                }
                await Context.SaveChangesAsync();
                Context.Kompanija.Remove(Kompanija);
                await Context.SaveChangesAsync();
                return Ok($"Kompanija obrisana");

             }
            else
            {
                return BadRequest("Kompanija nije pronadjena u bazi");
            }
        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
    }
    [Authorize(Roles ="Kompanija")]
    [Route("UpdateSifra/{id}/{staraSifra}/{novaSifra}")]
    [HttpPut]
    public async Task<IActionResult>UpdateSifra(int id,string staraSifra, string novaSifra)
    {
         try{
             var Kompanija = Context.Kompanija!.Find(id);
            
            if(Kompanija!=null)
            {
                string sifra;

                if(BCrypt.Net.BCrypt.Verify(staraSifra,Kompanija.Sifra))
                {
                    sifra = novaSifra;
                }
                else{
                    return BadRequest("Pogresna stara šifra");
                }

                if(sifra.Length<8 || sifra.Length>20 || Regex.IsMatch(sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
                    return BadRequest("Pogresan format nove sifre (sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
                
                string cryptNovaSifra =BCrypt.Net.BCrypt.HashPassword(sifra,10);

                Kompanija.Sifra=cryptNovaSifra;
                Context.Kompanija.Update(Kompanija);
                await Context.SaveChangesAsync();
                return Ok($"Sifra uspesno izmenjena");
            }
            else
            {
                return BadRequest("Kompanija nije pronadjena u bazi");
            }
        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
    }
    [Authorize(Roles ="Dispecer")]
    [Route("GetKompanije")]
    [HttpGet]
    public async Task<IActionResult> GetKompanije()
    {
        try{
            var Kompanije = await Context.Kompanija!.ToListAsync();
            return Ok(Kompanije);
        }
        catch(Exception ex)
        {
           return BadRequest(ex.Message);
        }
    }
    [Authorize(Roles ="Kompanija")]
    [Route("OceniVozaca/{idKompanije}/{idVozaca}/{idTure}")]
    [HttpPost]
    public async Task<IActionResult> OceniVozaca([FromBody] Ocena o,int idKompanije,int idVozaca,int idTure)
    {
        var kompanija=await Context.Kompanija!.FindAsync(idKompanije);
        var vozac=await Context.Vozac!.FindAsync(idVozaca);
        var tura=await Context.Tura!.FindAsync(idTure);

         var ocena=await Context.Ocena!.Where(p=>p.Tura!.ID==idTure && p.Vozac==vozac).FirstOrDefaultAsync();
         var dodeljena=await Context.DodeljeneTure!.Where(p=>p.Tura!.Kompanija==kompanija && p.Vozac==vozac).Include(p=>p.Tura).FirstOrDefaultAsync();
         if(ocena ==null)
         {
         if(/*dodeljena != null && dodeljena.Tura!.Status=="Zavrsena"*/true)
         {
            o.Kompanija=kompanija;
            o.Vozac=vozac;
            o.Tura=tura;
            try
            {
                Context.Ocena!.Add(o);
                await Context.SaveChangesAsync();
                return Ok(o);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        else
        {
            return BadRequest(new { message ="Tura nije zavrsena ili ne postoji"});
        }
        }
        else
        {
            return BadRequest(new { message = "Vec ste ocenili vozaca za ovu turu!" });
        }
    }
    [Authorize(Roles ="Kompanija")]
    [Route("FavorizujVozaca/{idKompanije}/{idVozaca}")]
    [HttpPost]
    public async Task<IActionResult> FavorizujVozaca(int idKompanije,int idVozaca)
    {
        var kompanija=await Context.Kompanija!.FindAsync(idKompanije);
        var vozac=await Context.Vozac!.FindAsync(idVozaca);
        var favPostojeca=await Context.Favorizacija!.Where(p => p.Kompanija!.ID==idKompanije && p.Vozac!.ID==idVozaca).FirstOrDefaultAsync();
        if(favPostojeca==null)
        {
            var fav=new Favorizacija();
            fav.Kompanija=kompanija;
            fav.Vozac=vozac;
                try
                {
                    Context.Favorizacija!.Add(fav);
                    await Context.SaveChangesAsync();
                    return Ok();
                }
                catch(Exception ex)
                {
                    return BadRequest(ex.Message);
                }
        }
        else
        {
            return BadRequest(new { message = "Vozac je vec favorizovan!" });
        }
    }
    [Authorize(Roles ="Kompanija")]
    [Route("BrisanjeFavorizovanog/{idKompanije}/{idVozaca}")]
    [HttpDelete]
    public async Task<IActionResult> BrisanjeFavorizovanog(int idKompanije,int idVozaca)
    {
        var fav=await Context.Favorizacija!.Where(p => p.Kompanija!.ID==idKompanije && p.Vozac!.ID==idVozaca).FirstOrDefaultAsync();
        try
        {
            if(fav!=null)
            Context.Favorizacija!.Remove(fav);
            await Context.SaveChangesAsync();
            return Ok();
        }
        catch(Exception ex)
        {
           return BadRequest(ex.Message);
        }
    }
     [Authorize(Roles ="Dispecer,Kompanija")]
     [Route("GetFavorizacije/{idKompanije}")]
     [HttpGet]
    public async Task<IActionResult> GetFavorizacije(int idKompanije)
    {
         try
        {
             var kompanija=await Context.Kompanija!.FindAsync(idKompanije);
             var vozaci=await Context.Favorizacija!.Where(p=>p.Kompanija!.ID==idKompanije).Select(p=>p.Vozac).ToListAsync();

             return Ok(vozaci);
        }
        catch(Exception ex)
        {
           return BadRequest(ex.Message);
        }
    }

    [AllowAnonymous]
    [Route("GetKompanija/{id}")]
    [HttpGet]
    public async Task<IActionResult>GetKompanija(int id)
    {
        try{
            var Kompanija = await Context.Kompanija!.FindAsync(id);
            return Ok(Kompanija);
        }
        catch(Exception ex)
        {
           return BadRequest(ex.Message);
        }
    }
}
