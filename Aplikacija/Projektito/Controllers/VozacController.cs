using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace Projektito.Controllers;

[ApiController]
[Route("[controller]")]
public class VozacController : ControllerBase
{
   public Context Context { get; set; }
  public VozacController(Context context)
  {
        Context=context;
  }
  [Route("AddVozac")]
  [HttpPost]
  public async Task<IActionResult> AddVozac ([FromBody]Vozac Vozac)
  {
    try
    {
        if(Vozac.Ime.Length<3 || Vozac.Ime.Length>30 || Regex.IsMatch(Vozac.Ime,"^[a-zA-z]+$")==false)
            return BadRequest("Los format imena");
        if(Vozac.Prezime.Length<3 || Vozac.Prezime.Length>30 || Regex.IsMatch(Vozac.Prezime,"^[a-zA-z]+$")==false)
            return BadRequest("Los format prezimena");
        if(Vozac.JMBG.Length!= 13 || Regex.IsMatch(Vozac.JMBG,"^[0-9]+$")==false)
            return BadRequest("Los format JMBG-a");
        if(Vozac.Email.Length<6 || Vozac.Email.Length>30 || Regex.IsMatch(Vozac.Email,@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")==false)
            return BadRequest("Los format Emaila");
        if(Vozac.KorisnickoIme.Length>20 || Vozac.KorisnickoIme.Length<1 || Regex.IsMatch(Vozac.KorisnickoIme,"^[a-zA-Z][a-zA-Z0-9]*$")==false)
            return BadRequest("Los format korisnickog imena");
        if(Vozac.Sifra.Length>20 || Vozac.Sifra.Length<1 || Regex.IsMatch(Vozac.Sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
            return BadRequest("Los format sifre (sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
        if(Regex.IsMatch(Vozac.BrojTelefona,@"^\+?[0-9][0-9\s.-]{7,11}$")==false)
            return BadRequest("Los format broja telefona");
         string sifra= BCrypt.Net.BCrypt.HashPassword(Vozac.Sifra,10);
        Vozac.Sifra=sifra;    
        var KompanijaEmail = Context.Kompanija!.Where( p => p.Email == Vozac.Email).FirstOrDefault();
        var KompanijaUsername = Context.Kompanija!.Where( p => p.KorisnickoIme == Vozac.KorisnickoIme).FirstOrDefault();
        var VozacEmail = Context.Vozac!.Where(p => p.Email == Vozac.Email).FirstOrDefault();
        var VozacUsername = Context.Vozac!.Where(p=>p.KorisnickoIme == Vozac.KorisnickoIme).FirstOrDefault();
        var DispecerEmail = Context.Dispecer!.Where(p=>p.Email == Vozac.Email).FirstOrDefault();
        var DispecerUsername = Context.Dispecer!.Where(p=>p.KorisnickoIme == Vozac.KorisnickoIme).FirstOrDefault();
        if(KompanijaEmail!=null || VozacEmail!=null || DispecerEmail!=null)
            return BadRequest("Vec postoji nalog sa tim emailom");
        if(KompanijaUsername!= null || VozacUsername!= null || DispecerUsername!= null)
            return BadRequest("Vec postoji nalog sa tim korisnickim imenom");
        Context.Vozac!.Add(Vozac);
        await Context.SaveChangesAsync();
        return Ok("Uspesno dodat Vozac");
        
    }
    catch(Exception ex){
        return BadRequest(ex.Message);
    }
  }
  [Authorize(Roles="Vozac")]
  [Route("UpdateVozac/{id}")]
  [HttpPut]
  public async Task<IActionResult> UpdateVozac([FromBody]Vozac Vozac, int id)
  {
      try
      {
        var Voz = Context.Vozac!.Find(id);
        if(Voz!=null)
        {
            if(Vozac.Ime.Length<3 || Vozac.Ime.Length>30 || Regex.IsMatch(Vozac.Ime,"^[a-zA-z]+$")==false)
                return BadRequest("Los format imena");
            if(Vozac.Prezime.Length<3 || Vozac.Prezime.Length>30 || Regex.IsMatch(Vozac.Prezime,"^[a-zA-z]+$")==false)
                return BadRequest("Los format prezimena");
            if(Vozac.JMBG.Length!= 13 || Regex.IsMatch(Vozac.JMBG,"^[0-9]+$")==false)
                return BadRequest("Los format JMBG-a");
            if(Vozac.Email.Length<6 || Vozac.Email.Length>30 || Regex.IsMatch(Vozac.Email,@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$")==false)
                return BadRequest("Los format Emaila");
            if(Vozac.KorisnickoIme.Length>20 || Vozac.KorisnickoIme.Length<1 || Regex.IsMatch(Vozac.KorisnickoIme,"^[a-zA-Z][a-zA-Z0-9]*$")==false)
                return BadRequest("Los format korisnickog imena");
            if(Vozac.Sifra.Length>20 || Vozac.Sifra.Length<1 || Regex.IsMatch(Vozac.Sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
                return BadRequest("Los format sifre (sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
            if(Regex.IsMatch(Vozac.BrojTelefona,@"^\+?[0-9][0-9\s.-]{7,11}$")==false)
                return BadRequest("Los format broja telefona");
            if(Vozac.Email != Voz.Email)
                {
                    var KompanijaEmail = Context.Kompanija!.Where( p => p.Email == Vozac.Email).FirstOrDefault();
                    var VozacEmail = Context.Vozac.Where(p => p.Email == Vozac.Email).FirstOrDefault();
                    var DispecerEmail = Context.Dispecer!.Where(p=>p.Email == Vozac.Email).FirstOrDefault();
                    if(KompanijaEmail!=null || VozacEmail!=null || DispecerEmail!=null)
                        return BadRequest("Vec postoji nalog sa tim emailom");
                }
            else if ( Vozac.KorisnickoIme!= Vozac.KorisnickoIme)
                {
                    var VozacUsername = Context.Vozac.Where(p=>p.KorisnickoIme == Vozac.KorisnickoIme).FirstOrDefault();
                    var KompanijaUsername = Context.Kompanija!.Where( p => p.KorisnickoIme == Vozac.KorisnickoIme).FirstOrDefault();
                    var DispecerUsername = Context.Dispecer!.Where(p=>p.KorisnickoIme == Vozac.KorisnickoIme).FirstOrDefault();
                    if(KompanijaUsername!= null || VozacUsername!= null || DispecerUsername!= null)
                        return BadRequest("Vec postoji nalog sa tim korisnickim imenom");
                }
                Voz.Ime = Vozac.Ime;
                Voz.Prezime = Vozac.Prezime;
                Voz.JMBG = Vozac.JMBG;
                Voz.Email = Vozac.Email;
                Voz.KorisnickoIme = Vozac.KorisnickoIme;
                Voz.Sifra= Vozac.Sifra;
                Voz.Slika=Vozac.Slika;
                Voz.BrojTelefona=Vozac.BrojTelefona;
                Context.Vozac.Update(Voz);
                await Context.SaveChangesAsync();
                return Ok($"Vozac izmenjen");
        }
        else
        {
            return BadRequest("Vozac nije pronadjena u bazi");
        }
      }
      catch(Exception ex){
         return BadRequest(ex.Message);
      }
  }
  [Route("DeleteVozac/{id}")]
  [HttpDelete]
  public async Task<ActionResult> DeleteVozac(int id)
  {
    try{
             var Vozac = Context.Vozac!.Find(id);
             if(Vozac!=null)
             {
                Context.Vozac.Remove(Vozac);
                await Context.SaveChangesAsync();
                return Ok($"Vozac obrisan");

             }
            else
            {
                return BadRequest("Vozac nije pronadjen u bazi");
            }
        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
   }
    [Authorize(Roles="Vozac")]
   [Route("UpdateSifra/{id}/{sifra}")]
  [HttpPut]
  public async Task<IActionResult>UpdateSifra(int id,string sifra)
    {
         try{
             var Vozac = Context.Vozac!.Find(id);
             if(Vozac!=null)
            {
                if(sifra.Length<8 || sifra.Length>20 || Regex.IsMatch(sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
                    return BadRequest("Pogresan format nove sifre (sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
                if(sifra==Vozac.Sifra)
                    return BadRequest("Nova sifra je ista kao stara");
                Vozac.Sifra=sifra;
                Context.Vozac.Update(Vozac);
                await Context.SaveChangesAsync();
                return Ok($"Sifra uspesno izmenjena");
            }
            else
            {
                return BadRequest("Vozac nije pronadjena u bazi");
            }
        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
    }
    [Route("GetVozace")]
    [HttpGet]
    public async Task<IActionResult>GetVozace()
    {
        try{
            var Vozaci = await Context.Vozac!.ToListAsync();
            return Ok(Vozaci);
        }
        catch(Exception ex)
        {
           return BadRequest(ex.Message);
        }
    }
    
}