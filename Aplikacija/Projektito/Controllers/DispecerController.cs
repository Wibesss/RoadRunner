using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace Projektito.Controllers;

[ApiController]
[Route("[controller]")]
public class DispecerController : ControllerBase
{
   public Context Context { get; set; }
  public DispecerController(Context context)
  {
        Context=context;
  }
  [Authorize(Roles ="Dispecer")]
  [Route("UpdateDispecer/{id}")]
  [HttpPut]
  public async Task<IActionResult> UpdateDispecer([FromBody]Dispecer disp, int id)
  {
      try
      {
        var Dispecer = Context.Dispecer!.Find(id);
        if(Dispecer!=null)
        {
            if (string.IsNullOrWhiteSpace(disp.Ime) || disp.Ime.Length < 3 || disp.Ime.Length > 30 || !Regex.IsMatch(disp.Ime, "^[a-zA-Z]+$"))
                ModelState.AddModelError("Ime", "Ime treba da ima između 3 i 30 karaktera i sadrži samo slovne karaktere.");

            if (string.IsNullOrWhiteSpace(disp.Prezime) || disp.Prezime.Length < 3 || disp.Prezime.Length > 30 || !Regex.IsMatch(disp.Prezime, "^[a-zA-Z]+$"))
                ModelState.AddModelError("Prezime", "Prezime treba da ima između 3 i 30 karaktera i sadrži samo slovne karaktere.");

            if (string.IsNullOrWhiteSpace(disp.JMBG) || disp.JMBG.Length != 13 || !Regex.IsMatch(disp.JMBG, "^[0-9]+$"))
                ModelState.AddModelError("JMBG", "JMBG treba da ima tačno 13 cifara.");

            if (string.IsNullOrWhiteSpace(disp.Email) || disp.Email.Length < 6 || disp.Email.Length > 30 || !Regex.IsMatch(disp.Email, @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"))
                ModelState.AddModelError("Email", "Email treba da bude između 6 i 30 karaktera i u validnom formatu.");

            if (string.IsNullOrWhiteSpace(disp.KorisnickoIme) || disp.KorisnickoIme.Length > 20 || disp.KorisnickoIme.Length < 1 || !Regex.IsMatch(disp.KorisnickoIme, "^[a-zA-Z][a-zA-Z0-9]*$"))
                ModelState.AddModelError("KorisnickoIme", "Korisničko ime treba da ima između 1 i 20 karaktera i može sadržati samo slovne karaktere i brojeve.");

            // Handle validation errors
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if(disp.Email != Dispecer.Email)
                {
                    var KompanijaEmail = Context.Kompanija!.Where( p => p.Email == disp.Email).FirstOrDefault();
                    var VozacEmail = Context.Vozac!.Where(p => p.Email == disp.Email).FirstOrDefault();
                    var DispecerEmail = Context.Dispecer.Where(p=>p.Email == disp.Email).FirstOrDefault();
                    if(KompanijaEmail!=null || VozacEmail!=null || DispecerEmail!=null)
                    {
                        ModelState.AddModelError("","Vec postoji nalog sa tim emailom");
                        return BadRequest(ModelState);
                    }
                }
            else if ( disp.KorisnickoIme!= Dispecer.KorisnickoIme)
                {
                    var VozacUsername = Context.Vozac!.Where(p=>p.KorisnickoIme == disp.KorisnickoIme).FirstOrDefault();
                    var KompanijaUsername = Context.Kompanija!.Where( p => p.KorisnickoIme == disp.KorisnickoIme).FirstOrDefault();
                    var DispecerUsername = Context.Dispecer.Where(p=>p.KorisnickoIme == disp.KorisnickoIme).FirstOrDefault();
                    if(KompanijaUsername!= null || VozacUsername!= null || DispecerUsername!= null)
                    {
                        ModelState.AddModelError("","Vec postoji nalog sa tim korisnickim imenom");
                        return BadRequest(ModelState);
                    }
                }
                Dispecer.Ime = disp.Ime;
                Dispecer.Prezime = disp.Prezime;
                Dispecer.JMBG = disp.JMBG;
                Dispecer.Email = disp.Email;
                Dispecer.KorisnickoIme = disp.KorisnickoIme;
                Dispecer.Slika=disp.Slika;
                Context.Dispecer.Update(Dispecer);
                await Context.SaveChangesAsync();
                return Ok("Dispecer izmenjen");
        }
        else
        {
            return BadRequest("Dispecer nije pronadjena u bazi");
        }
      }
      catch(Exception ex){
         return BadRequest(ex.Message);
      }
  }
  [Authorize(Roles ="Dispecer")]
  [Route("DeleteDispecer/{id}")]
  [HttpDelete]
  public async Task<ActionResult> DeleteDispecer(int id)
  {
    try{
             var Dispecer = Context.Dispecer!.Find(id);
             if(Dispecer!=null)
             {
                Context.Dispecer.Remove(Dispecer);
                await Context.SaveChangesAsync();
                return Ok($"Dispecer obrisan");

             }
            else
            {
                return BadRequest("Dispecer nije pronadjen u bazi");
            }
        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
  
  }
  [Authorize(Roles ="Dispecer")]
  [Route("UpdateSifra/{id}/{staraSifra}/{novaSifra}")]
  [HttpPut]
  public async Task<IActionResult>UpdateSifra(int id,string staraSifra,string novaSifra)
    {
        try{
             var Dispecer = Context.Dispecer!.Find(id);
             
             
            if(Dispecer!=null)
            {
                string sifra;
                
                if(BCrypt.Net.BCrypt.Verify(staraSifra,Dispecer.Sifra))
                {
                    sifra = novaSifra;
                }
                else{
                    return BadRequest("Pogresna stara šifra");
                }

                if(sifra.Length<8 || sifra.Length>20 || Regex.IsMatch(sifra,"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")==false)
                    return BadRequest("Pogresan format nove sifre (sifra mora da ima jedno veliko,jedno malo slovo, jedan specijalni znak i najmanja duzina je 8 karaktera)");
                
                string cryptNovaSifra =BCrypt.Net.BCrypt.HashPassword(sifra,10);
                
                Dispecer.Sifra=cryptNovaSifra;
                Context.Dispecer.Update(Dispecer);
                await Context.SaveChangesAsync();
                return Ok($"Sifra uspesno izmenjena");
            }
            else
            {
                return BadRequest("Dispecer nije pronadjena u bazi");
            }
        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
    }
    [Authorize(Roles ="Dispecer")]
    [Route("IzlistajVozaceZaTuru/{idTure}")]
    [HttpGet]
    public async Task<IActionResult>IzlistajVozaceZaTuru(int idTure)
    {
        try
    {
        var Turaa = await Context.Tura!.Include(p => p.TipRobe).Where(p => p.ID == idTure).FirstOrDefaultAsync();
        if(Turaa!.Status=="Slobodna")
            {
            List<Vozac> Lista = new List<Vozac>();
            if (Turaa != null && Turaa.TipRobe != null)
            {
                var tip = Turaa.TipRobe!.Tip;
                var Vozaci = Context.Vozac!.Include(p => p.Prikolice)!.ThenInclude(p => p.TipPrikolice).Include(p=>p.PonudjeneTure)!.ThenInclude(p=>p.Tura).Include(p=>p.DodeljeneTure)!.ThenInclude(p=>p.Tura);
                foreach (var v in Vozaci)
                {
                    var p = 0;
                    foreach (var prikolica in v.Prikolice!)
                    {
                        if (Turaa.TipRobe.Tip != null && prikolica.TipPrikolice!.Tip != null)
                        {
                            if (Turaa.TipRobe.Tip == "Tecnost" && prikolica.TipPrikolice.Tip == "Cisterna" && Turaa.Zapremina < prikolica.Zapremina)
                                p = 1;
                            else if (Turaa.TipRobe.Tip == "Cvrst Materijal" && prikolica.TipPrikolice.Tip == "Prikolica sa ciradom" && Turaa.TezinaRobe <= prikolica.Nosivost && Turaa.DuzinaRobe <= prikolica.Duzina && Turaa.SirinaRobe <= prikolica.Sirina && Turaa.VisinaRobe <= prikolica.Visina)
                                p = 1;
                            else if (Turaa.TipRobe.Tip == "Cvrst Materijal" && prikolica.TipPrikolice.Tip == "Prikolica bez cirade" && Turaa.TezinaRobe <= prikolica.Nosivost && Turaa.DuzinaRobe <= prikolica.Duzina && Turaa.SirinaRobe <= prikolica.Sirina && Turaa.VisinaRobe <= prikolica.Visina)
                                p = 1;
                            else if (Turaa.TipRobe.Tip == "Hrana" && prikolica.TipPrikolice.Tip == "Hladnjaca" && Turaa.TezinaRobe <= prikolica.Nosivost && Turaa.DuzinaRobe <= prikolica.Duzina && Turaa.SirinaRobe <= prikolica.Sirina && Turaa.VisinaRobe <= prikolica.Visina)
                                p = 1;
                            else if (Turaa.TipRobe.Tip == "Automobil" && prikolica.TipPrikolice.Tip == "Auto voz" && Turaa.TezinaRobe <= prikolica.Nosivost && Turaa.DuzinaRobe <= prikolica.Duzina && Turaa.SirinaRobe <= prikolica.Sirina && Turaa.VisinaRobe <= prikolica.Visina)
                                p = 1;
                        }
                    }
                    var z = 0;
                    if (p == 1)
                    {
                        if (v.DodeljeneTure != null)
                        {
                            foreach (var tura in v.DodeljeneTure)
                            {
                                if (tura.Tura != null && Turaa.DatumPocetka != null && Turaa.PredvidjeniKraj != null)
                                {
                                    if ((tura.Tura!.DatumPocetka <= Turaa.DatumPocetka && tura.Tura.PredvidjeniKraj >= Turaa.DatumPocetka) || (tura.Tura.DatumPocetka <= Turaa.PredvidjeniKraj && tura.Tura.PredvidjeniKraj >= Turaa.PredvidjeniKraj))
                                    {
                                        z = 1;
                                    }
                                }
                            }
                        }
                        
                        if (v.PonudjeneTure != null)
                        {
                            foreach (var tura in v.PonudjeneTure)
                            {
                                if (tura.Tura != null && Turaa.DatumPocetka != null && Turaa.PredvidjeniKraj != null)
                                {
                                    if ((tura.Tura.DatumPocetka <= Turaa.DatumPocetka && tura.Tura.PredvidjeniKraj >= Turaa.DatumPocetka) || (tura.Tura.DatumPocetka <= Turaa.PredvidjeniKraj && tura.Tura.PredvidjeniKraj >= Turaa.PredvidjeniKraj))
                                        z = 1;
                                
                                }
                            }
                        }
                        
                        if (z == 0)
                        {
                            if (v != null)
                                Lista.Add(v);
                        }
                    }
                }
            }
            return Ok(Lista);
        }
        else{
            return Ok("Tura vec dodata");
        }
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
    }
    [AllowAnonymous]
    [Route("GetDispecer/{id}")]
    [HttpGet]
    public async Task<IActionResult>GetDispecer(int id)
    {
        try{
            var Dispecer = await Context.Dispecer!.FindAsync(id);
            return Ok(Dispecer);
        }
        catch(Exception ex)
        {
           return BadRequest(ex.Message);
        }
    }

}