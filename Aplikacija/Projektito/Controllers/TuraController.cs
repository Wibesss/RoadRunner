using Microsoft.AspNetCore.Mvc;

namespace Projektito.Controllers;

[ApiController]
[Route("[controller]")]
public class TuraController : ControllerBase
{
    
   public Context Context {get; set;}
   
   public TuraController(Context context)
   {
        Context=context;
   }

   [Route("AddTura/{idKompanije}")]
   [HttpPost]
   public async Task<IActionResult> AddTura([FromBody] Tura t,int idKompanije )
   {
        try
        {  
            var komp=await Context!.Kompanija!.FindAsync(idKompanije);
            t.Kompanija=komp;
            int dodatnoVreme=(int)t.Duzina/840 + 1;
            DateTime datum=t.DatumPocetka.AddDays(dodatnoVreme);
            t.PredvidjeniKraj=datum;
            Context!.Tura!.Add(t);
            await Context.SaveChangesAsync();
            return Ok();
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

   }

   [Route("UpdateTura/{idTure}")]
   [HttpPut]
   public async Task<IActionResult> UpdateTura([FromBody] Tura t,int idTure)
   {
         
                var tura=await Context.Tura!.FindAsync(idTure);  
                if(tura != null)
                {
                    tura.TipRobe=t.TipRobe;
                    if(t.TipRobe==await Context!.TipTure!.FindAsync("Tecnost"))
                    {
                        tura.Zapremina=t.Zapremina;
                        tura.TezinaRobe=null;
                        tura.VisinaRobe=null;
                        tura.SirinaRobe=null;
                        tura.DuzinaRobe=null;
                    }
                    else if(t.TipRobe==await Context!.TipTure!.FindAsync("Hrana"))
                    {
                        tura.Zapremina=null;
                        tura.TezinaRobe=t.TezinaRobe;
                        tura.VisinaRobe=t.VisinaRobe;
                        tura.SirinaRobe=t.SirinaRobe;
                        tura.DuzinaRobe=t.DuzinaRobe;
                    }
                    else if(t.TipRobe==await Context!.TipTure!.FindAsync("Crst Materijal"))
                    {
                        tura.Zapremina=null;
                        tura.TezinaRobe=t.TezinaRobe;
                        tura.VisinaRobe=t.VisinaRobe;
                        tura.SirinaRobe=t.SirinaRobe;
                        tura.DuzinaRobe=t.DuzinaRobe;
                    }
                    else if(t.TipRobe==await Context!.TipTure!.FindAsync("Automobil"))
                    {
                        tura.Zapremina=null;
                        tura.TezinaRobe=t.TezinaRobe;
                        tura.VisinaRobe=t.VisinaRobe;
                        tura.SirinaRobe=t.SirinaRobe;
                        tura.DuzinaRobe=t.DuzinaRobe;
                    }
                    tura.Duzina=t.Duzina;
                    tura.DatumPocetka=t.DatumPocetka;
                    int dodatnoVreme=(int)tura.Duzina/840 + 1;
                    DateTime datum=tura.DatumPocetka.AddDays(dodatnoVreme);
                    tura.PredvidjeniKraj=datum;
                    tura.PocetnaGeografskaDuzina=t.PocetnaGeografskaDuzina;
                    tura.PocetnaGeografskaSirina=t.PocetnaGeografskaSirina;
                    tura.OdredisnaGeografskaDuzina=t.OdredisnaGeografskaDuzina;
                    tura.OdredisnaGeografskaSirina=t.OdredisnaGeografskaSirina;
                }     
        try
        { 
            Context.Update(tura!);
            await Context.SaveChangesAsync();
            return Ok(tura);
        }

        
        catch(Exception e)
        {
           return BadRequest(e.Message);     
        }
   
   }

   [Route("GetTipTure")]
   [HttpGet]
   public async Task<List<string>> GetTipTure()
   {
        var tipovi= await Context!.TipTure!.Select(p=> p.Tip).ToListAsync();
        return tipovi;
   }

   [Route("DeleteTura/{idTure}")]
   [HttpDelete]
   public async Task<IActionResult> DeleteTura(int idTure)
   {
        var tura=await Context.Tura!.FindAsync(idTure);
        if(tura!=null)
        {
            try
            {
                Context.Remove(tura);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana tura sa id-jem"+idTure+"!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Tura nije pronadjena");
        }

   }

    [Route("AddPonudjenaTura/{idTure}/{idDispecera}/{idVozaca}")]
    [HttpPost]
    public async Task<IActionResult> AddPonudjenaTura(int idTure,int idDispecera,int idVozaca)
    {
        var tura=await Context.Tura!.FindAsync(idTure);
        var dispecer=await Context.Dispecer!.FindAsync(idDispecera);
        var vozac=await Context.Vozac!.FindAsync(idVozaca);
        if(tura != null && dispecer!=null && vozac!=null)
        {
            PonudjenaTura pt=new PonudjenaTura();
            pt.Vozac=vozac;

            try
            {
                Context.PonudjenaTura!.Add(pt);
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
            return BadRequest("Nije pronadjena tura ili dispecer ili vozac");
        }
    }


}
