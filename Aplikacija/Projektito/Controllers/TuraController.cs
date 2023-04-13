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
   [Route("AddTipTure")]
   [HttpPost]
   public async Task<IActionResult> AddTipTure([FromBody]TipTure tt)
   {
        try
        {
           Context.TipTure!.Add(tt);
           await Context.SaveChangesAsync();
           return Ok();
        }
        catch(Exception e)
        {
             return BadRequest(e.Message);
        }

   }

  
   [Route("AddTura/{idKompanije}/{tipTure}")]
   [HttpPost]
   public async Task<IActionResult> AddTura([FromBody] Tura t,int idKompanije,string tipTure )
   {
            var komp=await Context!.Kompanija!.FindAsync(idKompanije);
            var tip=await Context!.TipTure!.FindAsync(tipTure);
        if(komp != null && tip!=null)
        {
        try
        {  
            if(t.TipRobe==await Context!.TipTure!.FindAsync("Tecnost"))
                {
                    t.TezinaRobe=null;
                    t.VisinaRobe=null;
                    t.SirinaRobe=null;
                    t.DuzinaRobe=null;
                }
                else if(t.TipRobe==await Context!.TipTure!.FindAsync("Hrana"))
                {
                    t.Zapremina=null;
            
                }
                else if(t.TipRobe==await Context!.TipTure!.FindAsync("Crst Materijal"))
                {
                    t.Zapremina=null;
                
                }
                else if(t.TipRobe==await Context!.TipTure!.FindAsync("Automobil"))
                {
                    t.Zapremina=null;
                
                    }
            t.Kompanija=komp;
            t.TipRobe=tip;
            t.Status="Slobodna";
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
        else
        {
            return BadRequest("Nije pronadjena kompanija ili tip ture!");
            
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
   public async Task<ActionResult> GetTipTure()
   {
        var tipovi= await Context!.TipTure!.Select(p=> p.Tip).ToListAsync();
        try
        {
        return Ok(tipovi);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
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
        var postojeca=Context.PonudjenaTura!.Where(p=>p.Tura!.ID==idTure && p.Vozac!.ID==idVozaca).FirstOrDefault();
        if(postojeca==null)
        {
            if(tura != null && dispecer!=null && vozac!=null)
            {
                PonudjenaTura pt=new PonudjenaTura();
                pt.Vozac=vozac;
                pt.Dispecer=dispecer;
                pt.Tura=tura;

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
        else
        {
            return BadRequest(vozac!.Ime+" "+vozac.Prezime+" je vec dobio ponudu za odredjenu turu");
        }
    }

    [Route("AddDodeljenaTura/{idPrihvaceneTure}")]
    [HttpPost]
    public async Task<IActionResult> AddDodeljenaTura(int idPrihvaceneTure)
    {
        var prihvacena=await Context!.PrihvacenaTura!.Where(p=> p.ID==idPrihvaceneTure).Include(p=>p.Dispecer).Include(p=>p.Tura).Include(p=>p.Vozac).Include(p=>p.Vozilo).FirstOrDefaultAsync();
        var dodeljena=await Context.DodeljeneTure!.Where(p=>p.Tura==prihvacena!.Tura).FirstOrDefaultAsync();
        if(dodeljena!=null)
        {
            return BadRequest("Tura je vec dodeljena drugom vozacu!");
        }
        else if(prihvacena!=null)
        {
            DodeljenaTuraa dt=new DodeljenaTuraa();
            dt.Vozac=prihvacena.Vozac;
            dt.Vozilo=prihvacena.Vozilo;
            dt.Tura=prihvacena.Tura;
            dt.Dispecer=prihvacena.Dispecer;
            dt.GenerisanaCena=prihvacena.GenerisanaCena;
            try
            {
                Context.DodeljeneTure!.Add(dt);
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
            return BadRequest("Nije pronadjena prihvacena tura");
        }
    }

    [Route("AddPrihvacenaTura/{idPonudjeneTure}/{idVozila}")]
    [HttpPost]
    public async Task<IActionResult> AddPrihvacenaTura(int idPonudjeneTure,int idVozila)
    {
        var ponudjena=await Context!.PonudjenaTura!.Where(p=> p.ID==idPonudjeneTure).Include(p=>p.Dispecer).Include(p=>p.Tura).Include(p=>p.Vozac).FirstOrDefaultAsync();
        var vozilo=await Context.Vozilo!.FindAsync(idVozila);
        if(ponudjena !=null && vozilo!=null)
        {
            var pt=new PrihvacenaTura();
            pt.Prosledjena=false;
            pt.Dispecer=ponudjena.Dispecer;
            pt.Vozac=ponudjena!.Vozac;
            pt.Vozilo=vozilo;
            pt.Tura=ponudjena.Tura;
            try
            {
                Context.PrihvacenaTura!.Add(pt);
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
            return BadRequest("Nije pronadjeno vozilo ili ponudjena tura");
        }
    }

     [Route("ProslediTuru/{idPrihvaceneTure}")]
    [HttpPut]
    public async Task<IActionResult> ProslediTuru(int idPrihvaceneTure)
    {
        var prihvacena=await Context.PrihvacenaTura!.FindAsync(idPrihvaceneTure);
        if(prihvacena!=null)
        {
            try
            {
                prihvacena.Prosledjena=true;
                await Context.SaveChangesAsync();
                return Ok("Tura uspesno prosledjena!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Nije pronadjena prihvacena tura!");
        }
    }


   [Route("DeletePonudjenaTura/{idTure}")]
   [HttpDelete]
   public async Task<IActionResult> DeletePonudjenaTura(int idTure)
   {
        var tura=await Context.PonudjenaTura!.FindAsync(idTure);
        if(tura!=null)
        {
            try
            {
                Context.Remove(tura);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana ponudjena tura sa id-jem"+idTure+" ");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Ponudjena tura nije pronadjena");
        }
   }

   [Route("DeletePrihvacenaTura/{idTure}")]
   [HttpDelete]
   public async Task<IActionResult> DeletePrihvacenaTura(int idTure)
   {
        var tura=await Context.PrihvacenaTura!.FindAsync(idTure);
        if(tura!=null)
        {
            try
            {
                Context.Remove(tura);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana prihvacena tura sa id-jem"+idTure+"!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Prihvacena tura nije pronadjena");
        }
   }

   [Route("DeleteDodeljenaTura/{idTure}")]
   [HttpDelete]
   public async Task<IActionResult> DeleteDodeljenaTura(int idTure)
   {
        var tura=await Context.DodeljeneTure!.FindAsync(idTure);
        if(tura!=null)
        {
            try
            {
                Context.Remove(tura);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana dodeljena tura sa id-jem"+idTure+"!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Dodeljena tura nije pronadjena");
        }
   }

   [Route("GetTura")]
   [HttpGet]
   public async Task<ActionResult> GetTura()
   {
        try{
        var ture= await Context!.Tura!.Include(p=>p.Kompanija).Include(p=>p.TipRobe).ToListAsync();
        return Ok(ture);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }

   [Route("GetPonudjenjaTura/{idVozaca}")]
   [HttpGet]
   public async Task<ActionResult> GetPonudjenjaTura(int idVozaca)
   {
        var ture= await Context!.PonudjenaTura!.Where(p=>p.Vozac!.ID==idVozaca).Include(p=>p.Dispecer)
        .Include(p=>p.Tura).Include(p=>p.Vozac).ToListAsync();
        return Ok(ture);
   }

   [Route("GetPrihvacenaTura/{idDispecera}")]
   [HttpGet]
   public async Task<ActionResult> GetPrihvacenaTura(int idDispecera)
   {
        var ture= await Context!.PrihvacenaTura!.Where(p=>p.Dispecer!.ID==idDispecera && p.Prosledjena==false).Include(p=>p.Dispecer)
        .Include(p=>p.Tura).Include(p=>p.Vozac).Include(p=>p.Vozilo).ToListAsync();
        return Ok(ture);
   }

   [Route("GetProsledjenaTura/{idKompanije}")]
   [HttpGet]
   public async Task<ActionResult> GetProsledjenaTura(int idKompanije)
   {
        var ture= await Context!.PrihvacenaTura!.Where(p=>p.Tura!.Kompanija!.ID==idKompanije && p.Prosledjena==true)
        .Include(p=>p.Dispecer).Include(p=>p.Tura).Include(p=>p.Vozac).Include(p=>p.Vozilo).ToListAsync();
        return Ok(ture);
   }
   

}
