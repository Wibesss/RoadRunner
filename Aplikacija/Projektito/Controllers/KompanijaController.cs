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

  [Route("AddKompanija")]
  [HttpPost]
  public async Task<IActionResult> AddKompanija([FromBody]Kompanija komp)
  {
    try{
        if(komp.Naziv.Length<1 || komp.Naziv.Length>20 || Regex.IsMatch(komp.Naziv,"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")==false)
            return BadRequest("Pogresan format naziva");
        if(komp.Email.Length<1 || Regex.IsMatch(komp.Email,@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")==false)
            return BadRequest("Pogresan format emaila");
        if(komp.KorisnickoIme.Length<1 || komp.KorisnickoIme.Length>20 || Regex.IsMatch(komp.KorisnickoIme,"^[a-zA-Z][a-zA-Z0-9]*$")==false)
            return BadRequest("Pogresan format korisnickog imena");
        if(komp.Sifra.Length<1 || komp.Sifra.Length>20 || Regex.IsMatch(komp.Sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
            return BadRequest("Pogresan format sifre (sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
        if(komp.Adresa.Length<1 || komp.Adresa.Length>40)
            return BadRequest("Pogresan format adrese");
        if(komp.Vlasnik.Length<1 || komp.Vlasnik.Length>40 || Regex.IsMatch(komp.Vlasnik,"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")==false)
            return BadRequest("Pogresan format vlasnika");
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
         return Ok($"Kompanija dodata");
    }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
}

    [Route("UpdateKompanija/{id}")]
    [HttpPut]
    public async Task<IActionResult> UpdateKompanija ([FromBody]Kompanija komp,int id)
    {
        
        try{
            var Kompanija = Context.Kompanija!.Find(id);
            if(Kompanija!=null)
            {
                if(komp.Naziv.Length<1 || komp.Naziv.Length>20 || Regex.IsMatch(komp.Naziv,"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")==false)
                    return BadRequest("Pogresan format naziva");
                if(komp.Email.Length<1 || Regex.IsMatch(komp.Email,@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")==false)
                    return BadRequest("Pogresan format emaila");
                if(komp.KorisnickoIme.Length<1 || komp.KorisnickoIme.Length>20 || Regex.IsMatch(komp.KorisnickoIme,"^[a-zA-Z][a-zA-Z0-9]*$")==false)
                    return BadRequest("Pogresan format korisnickog imena");
                if(komp.Sifra.Length<1 || komp.Sifra.Length>20 || Regex.IsMatch(komp.Sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
                    return BadRequest("Pogresan format sifre (sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
                if(komp.Adresa.Length<1 || komp.Adresa.Length>40)
                    return BadRequest("Pogresan format adrese");
                if(komp.Vlasnik.Length<1 || komp.Vlasnik.Length>40 || Regex.IsMatch(komp.Vlasnik,"^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")==false)
                    return BadRequest("Pogresan format vlasnika");
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
                Kompanija.Sifra=komp.Sifra;
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
    [Route("DeleteKompanija/{id}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteKompanija (int id)
    {
        try{
             var Kompanija = Context.Kompanija!.Find(id);
             if(Kompanija!=null)
             {
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
    [Route("UpdateSifra/{id}/{sifra}")]
    [HttpPut]
    public async Task<IActionResult>UpdateSifra(int id,string sifra)
    {
         try{
             var Kompanija = Context.Kompanija!.Find(id);
             if(Kompanija!=null)
            {
                if(sifra.Length<8 || sifra.Length>20 || Regex.IsMatch(sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
                    return BadRequest("Pogresan format nove sifre (sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
                if(sifra==Kompanija.Sifra)
                    return BadRequest("Nova sifra je ista kao stara");
                Kompanija.Sifra=sifra;
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

    [Route("OceniVozaca/{idKompanije}/{idVozaca}")]
    [HttpPost]
    public async Task<IActionResult> OceniVozaca([FromBody] Ocena o,int idKompanije,int idVozaca)
    {
        var kompanija=await Context.Kompanija!.FindAsync(idKompanije);
        var vozac=await Context.Vozac!.FindAsync(idVozaca);
        var dodeljena=await Context.DodeljeneTure!.Where(p=>p.Tura!.Kompanija==kompanija && p.Vozac==vozac).FirstOrDefaultAsync();
        if(dodeljena != null && dodeljena.Tura!.Status=="Zavrsena")
        {
            o.Kompanija=kompanija;
            o.Vozac=vozac;
            try
            {
                Context.Ocena!.Add(o);
                return Ok();
            }
            catch(Exception ex)
            {
            return BadRequest(ex.Message);
            }
        }
        else
        {
            return BadRequest("Tura nije zavrsena ili ne postoji");
        }
    }

     [Route("FavorizujVozaca/{idKompanije}/{idVozaca}")]
     [HttpPost]
    public async Task<IActionResult> FavorizujVozaca(int idKompanije,int idVozaca)
    {
        var kompanija=await Context.Kompanija!.FindAsync(idKompanije);
        var vozac=await Context.Vozac!.FindAsync(idVozaca);
        var fav=new Favorizacija();
        fav.Kompanija=kompanija;
        fav.Vozac=vozac;
        try
        {
            Context.Favorizacija!.Add(fav);
            return Ok();
        }
        catch(Exception ex)
        {
           return BadRequest(ex.Message);
        }
    }
   
}
