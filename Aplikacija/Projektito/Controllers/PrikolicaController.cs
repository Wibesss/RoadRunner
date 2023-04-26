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
                else if(tipPrikolice=="autoVoz")
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
   [Route("GetPrikolica/{idVozaca}")]
   [HttpGet]
   public async Task<IActionResult> GetPrikolica(int idVozaca)
   {
    try{
        var Vozac=Context.Vozac!.Where(p=>p.ID==idVozaca).FirstOrDefault();
        if(Vozac!=null)
        {
            var prikolice = await Context.Prikolica!.Where(p=>p.Vozac==Vozac).ToListAsync();
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

   [Route("DeltePrikolica/{idPrikolica}")]
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
    [Route("UpdatePrikolica/{idPrikolica}")]
    [HttpPut]
    public async Task<IActionResult> UpdatePrikolica ([FromBody]Prikolica prik , int idPrikolica)
    {
        try{
        var prikolica = await Context.Prikolica!.Where(p=>p.ID==idPrikolica).FirstOrDefaultAsync();
        if(prikolica!=null)
        {
            prikolica.TipPrikolice=prik.TipPrikolice;
            if(prikolica.TipPrikolice.Tip=="Hladnjaca")
            {
               prikolica.Zapremina=null;
            }
            else if(prikolica.TipPrikolice.Tip=="Cisterna")
            {
                prikolica.Duzina=null;
                prikolica.Sirina=null;
                prikolica.Visina=null;
                prikolica.Nosivost=null;
            }
            else if(prikolica.TipPrikolice.Tip=="Prikolica sa ciradom")
            {
                prikolica.Zapremina=null;
            }
            else if(prikolica.TipPrikolice.Tip=="Prikolica bez cirade")
            {
                prikolica.Zapremina=null;
            }
            else if(prikolica.TipPrikolice.Tip=="autoVoz")
            {
                prikolica.Zapremina=null;
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