using Microsoft.AspNetCore.Mvc;

namespace Projektito.Controllers;

[ApiController]
[Route("[controller]")]
public class VoziloController : ControllerBase
{
   public Context Context { get; set; }
  public VoziloController(Context context)
  {
        Context=context;
  }
   [Authorize(Roles ="Vozac,Dispecer")]
   [Route("AddVozilo/{idVozaca}")]
   [HttpPost]
   public async Task<IActionResult> AddVozilo([FromBody] Vozilo v,int idVozaca)
   {
        var vozac=await Context.Vozac!.FindAsync(idVozaca);
    
        if(vozac!=null)
        {
            v.Vozac=vozac;
            try
            { 
                Context!.Vozilo!.Add(v);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Vozac nije pronadjen!");
        }

   }
   
   [Authorize(Roles ="Vozac,Dispecer")]
   [Route("GetVozilo/{idVozaca}")]
   [HttpGet]
   public async Task<ActionResult> GetVozilo(int idVozaca)
   {
        try
        {
        var vozilo= await Context!.Vozilo!.Where(p=>p.Vozac!.ID==idVozaca).ToListAsync();
        return Ok(vozilo);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

   }
  [Authorize(Roles ="Vozac,Dispecer")]
  [Route("DeleteVozilo/{idVozila}")]
  [HttpDelete]
   public async Task<ActionResult> DeleteVozilo(int idVozila)
   {
    try{
             
            var vozilo = Context.Vozilo!.Find(idVozila);
             if(vozilo!=null)
             {
                Context.Vozilo.Remove(vozilo);
                await Context.SaveChangesAsync();
                return Ok($"Vozilo obrisano");

             }
            else
            {
                return BadRequest("Vozilo nije pronadjeno");
            }
        }
        catch(Exception ex){
            return BadRequest(ex.Message);
        }
    }
   [Authorize(Roles ="Vozac,Dispecer")]
   [Route("UpdateVozilo/{idVozila}")]
   [HttpPut]
   public async Task<IActionResult> UpdateVozilo([FromBody] Vozilo v,int idVozila)
   {
        var vozilo=await Context.Vozilo!.Where(p=>p.ID==idVozila).FirstOrDefaultAsync();

        if(vozilo!=null)
        {
            vozilo.Marka=v.Marka;
            vozilo.Model=v.Model;
            vozilo.Slika=v.Slika;
            vozilo.Tablice=v.Tablice;
            vozilo.CenaPoKilometru=v.CenaPoKilometru;
            try
            { 
                Context.Vozilo!.Update(vozilo);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Vozilo nije pronadjeno!");
        }

   }

    
}