using Microsoft.AspNetCore.Mvc;

namespace Projektito.Controllers;

[ApiController]
[Route("[controller]")]
public class PrikolicaController : ControllerBase
{
   public Context Context { get; set; }
  public PrikolicaController(Context context)
  {
        Context=context;
  }
  [AllowAnonymous]
  [Route("AddTipPrikolice")]
   [HttpPost]
   public async Task<IActionResult> AddTipPrikolice([FromBody]TipPrikolice tp)
   {
        try
        {
           if(tp!=null)
           {
                Context!.TipPrikolice!.Add(tp);
                await Context.SaveChangesAsync();
                return Ok();
           }
           else
           {
                return BadRequest("Nije unesen tip prikolice");
           }
        }
        catch(Exception e)
        {
             return BadRequest(e.Message);
        }

   }
   [Authorize(Roles ="Vozac")]
    [Route("AddPrikolica/{idVozaca}/{tipPrikolice}")]
   [HttpPost]
   public async Task<IActionResult> AddPrikolica([FromBody]Prikolica p,int idVozaca,string tipPrikolice)
   {
        var vozac=await Context.Vozac!.FindAsync(idVozaca);
        var tip = await Context.TipPrikolice!.FindAsync(tipPrikolice);
        if(vozac!=null && tip!= null)
        {
            try
            { 
                if(tipPrikolice=="Hladnjaca")
                {
                    p.Zapremina=null;
                }
                else if(tipPrikolice=="Cisterna")
                {
                    p.Duzina=null;
                    p.Sirina=null;
                    p.Visina=null;
                    p.Nosivost=null;
                }
                else if(tipPrikolice=="Prikolica sa ciradom")
                {
                    p.Zapremina=null;
                }
                else if(tipPrikolice=="Prikolica bez cirade")
                {
                    p.Zapremina=null;
                }
                else if(tipPrikolice=="AutoVoz")
                {
                    p.Zapremina=null;
                }
                p.Vozac=vozac;
                p.TipPrikolice=tip;
                Context.Prikolica!.Add(p);
                await Context.SaveChangesAsync();
                return Ok("Prikolica dodata");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Vozac ili tipPrikolice nije pronadjen!");
        }

   }
   [Authorize(Roles ="Dispecer,Vozac")]
   [Route("GetPrikolica/{idVozaca}")]
   [HttpGet]
   public async Task<IActionResult> GetPrikolica(int idVozaca)
   {
    try{
        var Vozac=Context.Vozac!.Where(p=>p.ID==idVozaca).FirstOrDefault();
        if(Vozac!=null)
        {
            var prikolice = await Context.Prikolica!.Where(p=>p.Vozac==Vozac).Include(z=>z.TipPrikolice).ToListAsync();
            return Ok(prikolice);
        }
        else
        {
            return BadRequest("Ne postojeci vozac!");
        }
     }
    catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
   [Authorize(Roles ="Dispecer,Vozac")]
    [Route("GetTipPrikolica")]
   [HttpGet]
   public async Task<IActionResult> GetTipPrikolica()
   {
    try{
       
            var tipPrikolica = await Context.TipPrikolice!.ToListAsync();
            return Ok(tipPrikolica);
        
     }
    catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
   [Authorize(Roles ="Vozac")]
   [Route("DeletePrikolica/{idPrikolica}")]
   [HttpDelete]
   public async Task<IActionResult> DeletePrikolica (int idPrikolica)
   {
    try{
        var prikolica = await Context.Prikolica!.Where(p=>p.ID==idPrikolica).FirstOrDefaultAsync();
        if(prikolica!=null)
        {
            Context.Prikolica!.Remove(prikolica);
            await Context.SaveChangesAsync();
            return Ok("Uspesno obrisana prikolica");
        }
        else
        {
            return BadRequest("Ne postoji zahtevana prikolica!");
        }
    }
     catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
   [Authorize(Roles ="Vozac")]
    [Route("UpdatePrikolica/{idPrikolica}/{tipPrikolice}")]
    [HttpPut]
    public async Task<IActionResult> UpdatePrikolica ([FromBody]Prikolica prik , int idPrikolica, string tipPrikolice)
    {
        try{
        var prikolica = await Context.Prikolica!.Where(p=>p.ID==idPrikolica).Include(z=>z.TipPrikolice).FirstOrDefaultAsync();
        var prikolicaaa = await Context.TipPrikolice!.Where(p => p.Tip==tipPrikolice).FirstOrDefaultAsync();
        if(prikolica!=null)
        {
            prikolica.TipPrikolice=prikolicaaa;
            if(prikolica.TipPrikolice!.Tip == "Hladnjaca")
            {
               prikolica.Zapremina=null;
               prikolica.Duzina=prik.Duzina;
               prikolica.Sirina=prik.Sirina;
               prikolica.Visina=prik.Visina;
               prikolica.Nosivost=prik.Nosivost;
            }
            else if(prikolica.TipPrikolice.Tip == "Cisterna")
            {
                prikolica.Zapremina=prik.Zapremina;
                prikolica.Duzina=null;
                prikolica.Sirina=null;
                prikolica.Visina=null;
                prikolica.Nosivost=null;
            }
            else if(prikolica.TipPrikolice.Tip == "Prikolica sa ciradom")
            {
               prikolica.Zapremina=null;
               prikolica.Duzina=prik.Duzina;
               prikolica.Sirina=prik.Sirina;
               prikolica.Visina=prik.Visina;
               prikolica.Nosivost=prik.Nosivost;
            }
            else if(prikolica.TipPrikolice.Tip == "Prikolica bez cirade")
            {
               prikolica.Zapremina=null;
               prikolica.Duzina=prik.Duzina;
               prikolica.Sirina=prik.Sirina;
               prikolica.Visina=prik.Visina;
               prikolica.Nosivost=prik.Nosivost;
            }
            else if(prikolica.TipPrikolice.Tip == "Auto voz")
            {
               prikolica.Zapremina=null;
               prikolica.Duzina=prik.Duzina;
               prikolica.Sirina=prik.Sirina;
               prikolica.Visina=prik.Visina;
               prikolica.Nosivost=prik.Nosivost;
            }
            prikolica.Tablice=prik.Tablice;
            prikolica.Slika=prik.Slika;
            Context.Prikolica!.Update(prikolica);
            await Context.SaveChangesAsync();
            return Ok("Uspesno updateovana prikolica");
        }
        
        else
        {
            return BadRequest("Ne postoji zahtevana prikolica!");
        }
    }
     catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}