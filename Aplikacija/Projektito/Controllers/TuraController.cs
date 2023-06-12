using Microsoft.AspNetCore.Mvc;

namespace Projektito.Controllers;

[ApiController]
[Route("[controller]")]
public class TuraController : ControllerBase
{
    
   public Context Context {get; set;}
    public readonly IHubContext<NotificationsHub> _hubContext;

        public TuraController(Context context, IHubContext<NotificationsHub> hubContext)
        {
            Context = context;
            _hubContext = hubContext;
        }
        
   [Authorize(Roles ="Dispecer")]
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



   [Authorize(Roles ="Kompanija,Dispecer")]
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
            if(tipTure == "Tecnost")
                {
                    t.TezinaRobe=null;
                    t.VisinaRobe=null;
                    t.SirinaRobe=null;
                    t.DuzinaRobe=null;
                }
                else if(tipTure == "Hrana")
                {
                    t.Zapremina=null;
            
                }
                else if(tipTure == "Cvrst Materijal")
                {
                    t.Zapremina=null;
                
                }
                else if(tipTure == "Automobil")
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
            return Ok(t);
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

   [Authorize(Roles ="Kompanija,Dispecer")] 
   [Route("UpdateTura/{idTure}/{tipTure}")]
   [HttpPut]
   public async Task<IActionResult> UpdateTura([FromBody] Tura t,int idTure,string tipTure)
   {
          
            var tura=await Context.Tura!.Where(p=>p.ID==idTure).Include(p=>p.TipRobe).FirstOrDefaultAsync();
            var tip=await Context.TipTure!.Where(p=>p.Tip==tipTure).FirstOrDefaultAsync();
            if(tura != null && tura.Status=="Slobodna")
                {
                    tura.TipRobe=tip;
                    if(tipTure =="Tecnost")
                    {
                        tura.Zapremina=t.Zapremina;
                        tura.TezinaRobe=null;
                        tura.VisinaRobe=null;
                        tura.SirinaRobe=null;
                        tura.DuzinaRobe=null;
                    }
                    else if(tipTure == "Hrana")
                    {
                        tura.Zapremina=null;
                        tura.TezinaRobe=t.TezinaRobe;
                        tura.VisinaRobe=t.VisinaRobe;
                        tura.SirinaRobe=t.SirinaRobe;
                        tura.DuzinaRobe=t.DuzinaRobe;
                    }
                    else if(tipTure == "Cvrst Materijal")
                    {
                        tura.Zapremina=null;
                        tura.TezinaRobe=t.TezinaRobe;
                        tura.VisinaRobe=t.VisinaRobe;
                        tura.SirinaRobe=t.SirinaRobe;
                        tura.DuzinaRobe=t.DuzinaRobe;
                    }
                    else if(tipTure == "Automobil")
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
                    t.Status="Slobodna";
                    tura.PocetnaGeografskaDuzina=t.PocetnaGeografskaDuzina;
                    tura.PocetnaGeografskaSirina=t.PocetnaGeografskaSirina;
                    tura.OdredisnaGeografskaDuzina=t.OdredisnaGeografskaDuzina;
                    tura.OdredisnaGeografskaSirina=t.OdredisnaGeografskaSirina;
                } 
                else
                {
                    return BadRequest("Tura ne postoji ili nije slobodna!");

                }    
        try
        { 
            Context.Tura!.Update(tura!);
            await Context.SaveChangesAsync();
            return Ok(tura);
        }

        
        catch(Exception e)
        {
           return BadRequest(e.Message);     
        }
   
   }
   [AllowAnonymous] 
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
   [Authorize(Roles ="Kompanija,Dispecer")] 
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
    [Authorize(Roles ="Dispecer")]
    [Route("AddPonudjenaTura/{idTure}/{idDispecera}/{idieviVozaca}")]
    [HttpPost]
    public async Task<IActionResult> AddPonudjenaTura(int idTure,int idDispecera,string idieviVozaca)
    {
        try{
            var tura=await Context.Tura!.FindAsync(idTure);
            var dispecer=await Context.Dispecer!.FindAsync(idDispecera);
            int[] idieviVozacaArray = idieviVozaca.Split(',').Select(int.Parse).ToArray();
            var vozaci = await Context.Vozac!.Where(p => idieviVozacaArray.Contains(p.ID)).ToListAsync();
            foreach ( var vozac in vozaci)
            {
                var postojeca=Context.PonudjenaTura!.Where(p=>p.Tura!.ID==idTure && p.Vozac!.ID==vozac.ID).FirstOrDefault();
                var postojecaPrihvacena = Context.PrihvacenaTura!.Where(p=>p.Tura!.ID==idTure).FirstOrDefault();
                if(postojeca==null && postojecaPrihvacena==null)
                {
                    if(tura != null && dispecer!=null && vozac!=null)
                    {
                        PonudjenaTura pt=new PonudjenaTura();
                        pt.Vozac=vozac;
                        pt.Dispecer=dispecer;
                        pt.Tura=tura;
                        Context.PonudjenaTura!.Add(pt);
                        await Context.SaveChangesAsync();

                        var connectionId = await Context.ConnectionInfoo!
                        .Where(p => p.korisnickoIme == vozac!.KorisnickoIme)
                        .Select(p => p.ConnedtionId)
                        .FirstOrDefaultAsync();

                    if (connectionId != null)
                    {
                        await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveMessage", "Ponudjena vam je nova tura!");
                    }
                        
                    }
                }
            }
            return Ok("Dodato");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }
    [Authorize(Roles ="Kompanija")]
    [Route("AddDodeljenaTura/{idVozaca}/{idTure}")]
    [HttpPost]
    public async Task<IActionResult> AddDodeljenaTura(int idVozaca,int idTure)
    {
        var prihvacena=await Context!.PrihvacenaTura!.Where(p=> p.Vozac!.ID==idVozaca && p.Tura!.ID==idTure).Include(p=>p.Dispecer).Include(p=>p.Tura).Include(p=>p.Vozac).Include(p=>p.Vozilo).FirstOrDefaultAsync();
        var dodeljena=await Context.DodeljeneTure!.Where(p=>p.Tura!.ID==idTure).FirstOrDefaultAsync();
        var vozac=await Context.Vozac!.FindAsync(idVozaca);
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
            dt.Tura!.Status="Dodeljena";
            try
            {
                Context.DodeljeneTure!.Add(dt);
                var svePrihvacene=await Context.PrihvacenaTura!.Where(p=>p.Tura!.ID==idTure).ToListAsync();
                if(svePrihvacene!=null)
                {
                    foreach(var p in svePrihvacene)
                    {
                        Context.Remove(p);
                    }
                }
                await Context.SaveChangesAsync();

                var connectionId = await Context.ConnectionInfoo!
                .Where(p => p.korisnickoIme == vozac!.KorisnickoIme)
                .Select(p => p.ConnedtionId)
                .FirstOrDefaultAsync();

            if (connectionId != null)
            {
                await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveMessage", "Dodeljena vam je nova tura!");
            }

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
    [Authorize(Roles ="Vozac")]
    [Route("AddPrihvacenaTura/{idPonudjeneTure}/{idVozila}")]
    [HttpPost]
    public async Task<IActionResult> AddPrihvacenaTura(int idPonudjeneTure,int idVozila)
    {
        var ponudjena=await Context!.PonudjenaTura!.Where(p=> p.ID==idPonudjeneTure).Include(p=>p.Dispecer).Include(p=>p.Tura).Include(p=>p.Vozac).FirstOrDefaultAsync();
        var vozilo=await Context.Vozilo!.FindAsync(idVozila);
        if(ponudjena !=null)
        {
            var pt=new PrihvacenaTura();
            pt.Prosledjena=false;
            pt.Dispecer=ponudjena.Dispecer;
            pt.Vozac=ponudjena!.Vozac;
            pt.Vozilo=vozilo;
            pt.Tura=ponudjena.Tura;
            pt.GenerisanaCena=ponudjena.Tura!.Duzina*vozilo!.CenaPoKilometru;
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
    [Authorize(Roles ="Dispecer")]
    [Route("ProslediTuru/{idTure}/{idieviVozaca}")]
    [HttpPut]
    public async Task<IActionResult> ProslediTuru(int idTure,string idieviVozaca)
    {
        int[] idieviVozacaArray = idieviVozaca.Split(',').Select(int.Parse).ToArray();
        int kurac =0;
        var prihvacene=await Context.PrihvacenaTura!.Where(p=>p.Tura!.ID==idTure && idieviVozacaArray.Contains(p.Vozac!.ID)).ToListAsync();
        if(prihvacene!=null)
        {
            foreach(var prihvacena in prihvacene)
            {
                prihvacena.Prosledjena=true;
                await Context.SaveChangesAsync();
                kurac++;
            }
            var prihvacenee = await Context.PrihvacenaTura!.Where(p=>p.Tura!.ID==idTure).ToListAsync();
            foreach(var prihvacenaa in prihvacenee)
            {
                if(prihvacenaa.Prosledjena==false)
                {
                    Context.PrihvacenaTura!.Remove(prihvacenaa);
                    await Context.SaveChangesAsync();
                }
            }
            return Ok(kurac);
        }
        else
        {
            return BadRequest("Nije pronadjena prihvacena tura!");
        }
    }

   [Authorize(Roles ="Vozac")] 
   [Route("DeletePonudjenaTura/{idTure}/{idVozaca}")]
   [HttpDelete]
   public async Task<IActionResult> DeletePonudjenaTura(int idTure,int idVozaca)
   {
        var tura=await Context.PonudjenaTura!.Where(p=>p.Tura!.ID==idTure && p.Vozac!.ID==idVozaca).FirstOrDefaultAsync();
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
    [Authorize(Roles ="Dispecer")] 
   [Route("DeletePonudjeneTure/{idTure}")]
   [HttpDelete]
   public async Task<IActionResult> DeletePonudjeneTure(int idTure)
   {
        var ture=await Context.PonudjenaTura!.Where(p=>p.Tura!.ID==idTure).ToListAsync();
        if(ture!=null)
        {
            try
            {
                foreach(var tura in ture)
                {
                    Context.Remove(tura);
                    await Context.SaveChangesAsync();
                }
                return Ok("Uspesno obrisane ponudjene tura sa id-jem"+idTure+" ");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Ponudjene ture nisu pronadjene");
        }
   }
   [Authorize(Roles ="Dispecer")] 
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
    [Authorize(Roles ="Dispecer")] 
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
    [Authorize(Roles ="Dispecer")] 
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
   [Authorize(Roles ="Vozac")] 
   [Route("GetPonudjenjaTuraVozac/{idVozaca}")]
   [HttpGet]
   public async Task<ActionResult> GetPonudjenjaTuraVozac(int idVozaca)
   {
        try
        {
            var ture= await Context!.PonudjenaTura!.Where(p=>p.Vozac!.ID==idVozaca).Include(p=>p.Dispecer)
            .Include(p=>p.Tura).ThenInclude(p=>p!.TipRobe).Include(p => p.Tura)
            .ThenInclude(p => p!.Kompanija).Include(p=>p.Vozac)
            .Select(p => new {
            p.ID,
            TipRobe = p.Tura!.TipRobe!.Tip,
            TezinaRobe = p.Tura!.TezinaRobe,
            DuzinaRobe = p.Tura!.DuzinaRobe,
            SirinaRobe = p.Tura!.SirinaRobe,
            VisinaRobe = p.Tura!.VisinaRobe,
            ZapreminaRobe = p.Tura!.Zapremina,
            PocetnaGeografskaSirina = p.Tura!.PocetnaGeografskaSirina,
            PocetnaGeografskaDuzina = p.Tura!.PocetnaGeografskaDuzina,
            OdredisnaGeografskaSirina = p.Tura!.OdredisnaGeografskaSirina,
            OdredisnaGeografskaDuzina = p.Tura!.OdredisnaGeografskaDuzina,
            Status = p.Tura!.Status,
            Duzina = p.Tura!.Duzina,
            DatumPocetka = p.Tura!.DatumPocetka,
            PredvidjeniKraj = p.Tura!.PredvidjeniKraj,
            KompanijaNaziv = p.Tura.Kompanija!.Naziv,
            TuraId = p.Tura!.ID
    }).ToListAsync();
            return Ok(ture);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
    [Authorize(Roles ="Vozac")] 
   [Route("GetPrihvacenaTuraVozac/{idVozaca}")]
   [HttpGet]
   public async Task<ActionResult> GetPrihvacenaTuraVozac(int idVozaca)
   {
        try
        {
            var ture= await Context!.PrihvacenaTura!.Where(p=>p.Vozac!.ID==idVozaca).Include(p=>p.Dispecer)
            .Include(p=>p.Tura).ThenInclude(p=>p!.TipRobe).Include(p => p.Tura)
            .ThenInclude(p => p!.Kompanija).Include(p=>p.Vozac)
            .Select(p => new {
            p.ID,
            TipRobe = p.Tura!.TipRobe!.Tip,
            TezinaRobe = p.Tura!.TezinaRobe,
            DuzinaRobe = p.Tura!.DuzinaRobe,
            SirinaRobe = p.Tura!.SirinaRobe,
            VisinaRobe = p.Tura!.VisinaRobe,
            ZapreminaRobe = p.Tura!.Zapremina,
            PocetnaGeografskaSirina = p.Tura!.PocetnaGeografskaSirina,
            PocetnaGeografskaDuzina = p.Tura!.PocetnaGeografskaDuzina,
            OdredisnaGeografskaSirina = p.Tura!.OdredisnaGeografskaSirina,
            OdredisnaGeografskaDuzina = p.Tura!.OdredisnaGeografskaDuzina,
            Status = p.Tura!.Status,
            Duzina = p.Tura!.Duzina,
            DatumPocetka = p.Tura!.DatumPocetka,
            PredvidjeniKraj = p.Tura!.PredvidjeniKraj,
            KompanijaNaziv = p.Tura.Kompanija!.Naziv,
            TuraId = p.Tura!.ID,
            SlikaVozila = p.Vozilo!.Slika,
            Cena = p.GenerisanaCena

    }).ToListAsync();
            return Ok(ture);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
    [Authorize(Roles ="Vozac")] 
   [Route("GetDodeljenaTuraVozac/{idVozaca}")]
   [HttpGet]
   public async Task<ActionResult> GetDodeljenaTuraVozac(int idVozaca)
   {
        try
        {
            var ture= await Context!.DodeljeneTure!.Where(p=>p.Vozac!.ID==idVozaca).Include(p=>p.Dispecer)
            .Include(p=>p.Tura).ThenInclude(p=>p!.TipRobe).Include(p => p.Tura)
            .ThenInclude(p => p!.Kompanija).Include(p=>p.Vozac)
            .Select(p => new {
            p.ID,
            TipRobe = p.Tura!.TipRobe!.Tip,
            TezinaRobe = p.Tura!.TezinaRobe,
            DuzinaRobe = p.Tura!.DuzinaRobe,
            SirinaRobe = p.Tura!.SirinaRobe,
            VisinaRobe = p.Tura!.VisinaRobe,
            ZapreminaRobe = p.Tura!.Zapremina,
            PocetnaGeografskaSirina = p.Tura!.PocetnaGeografskaSirina,
            PocetnaGeografskaDuzina = p.Tura!.PocetnaGeografskaDuzina,
            OdredisnaGeografskaSirina = p.Tura!.OdredisnaGeografskaSirina,
            OdredisnaGeografskaDuzina = p.Tura!.OdredisnaGeografskaDuzina,
            Status = p.Tura!.Status,
            Duzina = p.Tura!.Duzina,
            DatumPocetka = p.Tura!.DatumPocetka,
            PredvidjeniKraj = p.Tura!.PredvidjeniKraj,
            KompanijaNaziv = p.Tura.Kompanija!.Naziv,
            TuraId = p.Tura!.ID,
            SlikaVozila = p.Vozilo!.Slika,
            Cena = p.GenerisanaCena

            }).ToListAsync();
            return Ok(ture);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
   [Authorize(Roles ="Dispecer")]
   [Route("GetPrihvacenaTura/{idDispecera}")]
   [HttpGet]
   public async Task<ActionResult> GetPrihvacenaTura(int idDispecera)
   {
        try
        {
            var distinctTuraIds = await Context!.PrihvacenaTura!
            .Include(p => p.Tura)
            .Where(p => p.Dispecer!.ID == idDispecera && p.Prosledjena == false)
            .Select(p => p.Tura!.ID)
            .Distinct()
            .ToListAsync();

             var ture = await Context!.PrihvacenaTura!
            .Include(p => p.Dispecer)
            .Include(p => p.Tura)
            .ThenInclude(p=>p!.TipRobe)
            .Include(p => p.Tura)
            .ThenInclude(p=>p!.Kompanija)
            .Include(p => p.Vozac)
            .Include(p => p.Vozilo)
            .Where(p => p.Dispecer!.ID == idDispecera && p.Prosledjena == false && distinctTuraIds.Contains(p.Tura!.ID))
            .GroupBy(p => p.Tura!.ID)
            .Select(g => g.OrderBy(p => p.ID).First())
            .ToListAsync();

            var filtriraneTure = ture.Select(p => new {
            p.ID,
            TipRobe = p.Tura?.TipRobe?.Tip,
            TezinaRobe = p.Tura?.TezinaRobe,
            DuzinaRobe = p.Tura?.DuzinaRobe,
            SirinaRobe = p.Tura?.SirinaRobe,
            VisinaRobe = p.Tura?.VisinaRobe,
            ZapreminaRobe = p.Tura?.Zapremina,
            PocetnaGeografskaSirina = p.Tura?.PocetnaGeografskaSirina,
            PocetnaGeografskaDuzina = p.Tura?.PocetnaGeografskaDuzina,
            OdredisnaGeografskaSirina = p.Tura?.OdredisnaGeografskaSirina,
            OdredisnaGeografskaDuzina = p.Tura?.OdredisnaGeografskaDuzina,
            Status = p.Tura?.Status,
            Duzina = p.Tura?.Duzina,
            DatumPocetka = p.Tura?.DatumPocetka,
            PredvidjeniKraj = p.Tura?.PredvidjeniKraj,
            KompanijaNaziv = p.Tura?.Kompanija?.Naziv,
            KompanijaId = p.Tura?.Kompanija?.ID,
            TuraId = p.Tura?.ID,
            LogoKompanije = p.Tura?.Kompanija?.Logo

            }).ToList();
            return Ok(filtriraneTure);
        } 
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
    [Authorize(Roles ="Dispecer")] 
   [Route("GetProsledjenaTura/{idKompanije}")]
   [HttpGet]
   public async Task<ActionResult> GetProsledjenaTura(int idKompanije)
   {
        try
        {
            var ture= await Context!.PrihvacenaTura!.Where(p=>p.Tura!.Kompanija!.ID==idKompanije && p.Prosledjena==true)
            .Include(p=>p.Dispecer).Include(p=>p.Tura).Include(p=>p.Vozac).Include(p=>p.Vozilo).ToListAsync();
            return Ok(ture);
        } 
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
    [Authorize(Roles ="Vozac")] 
   [Route("ZapocniTuru/{idDodeljeneTure}")]
   [HttpPut]
    public async Task<ActionResult>  ZapocniTuru(int idDodeljeneTure)
   {
        var dodeljena=await Context.DodeljeneTure!.Where(p=> p.ID==idDodeljeneTure).Include(p=>p.Dispecer).Include(p=>p.Tura).Include(p=>p.Vozac).FirstOrDefaultAsync();
        DateTime dt = DateTime.Now;
        if(dodeljena!.Tura!.Status=="Dodeljena")
        {
            if(dt>=dodeljena!.Tura!.DatumPocetka)
            {
                dodeljena!.Tura!.Status="U toku";
                try
                {
                    Context.DodeljeneTure!.Update(dodeljena);
                    await Context.SaveChangesAsync();
                    return Ok("Tura zapoceta!");
                } 
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
            }
            else
            {
                return BadRequest("Tura se ne moze startovati pre datuma pocetka");
            } 
        }
        else
        {
            return BadRequest("Tura nije u toku!");
        }    
   }
    [Authorize(Roles ="Vozac")] 
   [Route("ZavrsiTuru/{idDodeljeneTure}")]
   [HttpPut]
    public async Task<ActionResult>  ZavrsiTuru(int idDodeljeneTure)
   {
        var dodeljena=await Context.DodeljeneTure!.Where(p=> p.ID==idDodeljeneTure).Include(p=>p.Dispecer).Include(p=>p.Tura).Include(p=>p.Vozac).FirstOrDefaultAsync();
        if(dodeljena!.Tura!.Status=="U toku")
        {
            dodeljena!.Tura!.Status="Zavrsena";
            try
            {
                Context.DodeljeneTure!.Update(dodeljena);
                await Context.SaveChangesAsync();
                return Ok("Tura zavrsena!");
            } 
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        else
        {
            return BadRequest("Tura nije u toku!");
        }    
   }
   [Authorize(Roles ="Kompanija")] 
   [Route("GetTuraKompanija/{idKompanije}")]
   [HttpGet]
   public async Task<ActionResult> GetTuraKompanija(int idKompanije)
   {
        try{
            var ture= await Context!.Tura!.Where(p=>p.Kompanija!.ID==idKompanije).Include(p=>p.Kompanija).Include(p=>p.TipRobe).ToListAsync();
            return Ok(ture);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
    [Authorize(Roles ="Kompanija")] 
   [Route("GetVozaceZaTuru/{idTure}")]
   [HttpGet]
   public async Task<ActionResult> GetVozaceZaTuru(int idTure)
   {
        try{
           var vozaci = await Context!.PrihvacenaTura!
            .Where(p => p.Tura!.ID == idTure && p.Prosledjena == true)
            .Include(p => p.Vozac)
            .Select(p => new { p.Vozac, p.GenerisanaCena })
            .ToListAsync();

        var vozaciWithSrednja = new List<(dynamic Vozac, decimal Srednja,double GenerisanaCena)>();

        foreach (var v in vozaci)
        {
            decimal srednja = 0;
            var ocene = await Context.Ocena!
                .Where(p => p!.Vozac!.ID == v.Vozac!.ID)
                .ToListAsync();
            var ukupniBrojOcena = ocene.Count;
            var ukupneOcene = ocene.Sum(item => item.Broj);
            if (ukupniBrojOcena != 0)
            {
                srednja = (decimal)ukupneOcene / ukupniBrojOcena;
            }
            vozaciWithSrednja.Add((v.Vozac!, srednja,v.GenerisanaCena));
        }

        var sortedVozaci = vozaciWithSrednja.OrderByDescending(v => v.Srednja).Select(v => new { v.Vozac, v.GenerisanaCena }).ToList();
        return Ok(sortedVozaci);

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
    [Authorize(Roles ="Kompanija")] 
   [Route("GetVozacaZaTuru/{idTure}")]
   [HttpGet]
   public async Task<ActionResult> GetVozacaZaTuru(int idTure)
   {
        try{
           var vozac = await Context!.DodeljeneTure!
            .Where(p => p.Tura!.ID == idTure)
            .Include(p => p.Vozac)
            .Select(p => new { p.Vozac, p.GenerisanaCena })
            .FirstOrDefaultAsync();
        return Ok(vozac);

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
   [Authorize(Roles ="Dispecer")]
   [Route("GetVozaceZaTuruDispecer/{idTure}")]
   [HttpGet]
   public async Task<ActionResult> GetVozaceZaTuruDispecer(int idTure)
   {
        try{
            var vozaci= await Context!.PrihvacenaTura!.Where(p=>p.Tura!.ID==idTure).Include(p=>p.Vozac)
            .Select(p=> new {
                p.Vozac,
                p.GenerisanaCena,
                p.Vozilo!.Marka,
                p.Vozilo!.Model,
                p.Vozilo!.Slika,
            
            }).ToListAsync();
            return Ok(vozaci);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
   [Authorize(Roles ="Dispecer")]
   [Route("GetNoveTureDispecer")]
    [HttpGet]
   public async Task<IActionResult> GetNoveTureDispecer()
   {
        try{
            var ture= await Context!.Tura!.Include(p=>p.Kompanija).Include(p=>p.TipRobe).Where(p=>p.Status!="Dodeljena" && p.Status!= "Zavrsena" && p.Status!= "U toku").ToListAsync();
            var ponudjeneTure = await Context!.PonudjenaTura!.Include(p=>p.Tura).ToListAsync();
            var prihvaceneTure = await Context!.PrihvacenaTura!.Include(p=>p.Tura).ToListAsync();
            ture.RemoveAll(tura => ponudjeneTure.Any(ponudjena => ponudjena.Tura!.ID == tura.ID));
            ture.RemoveAll(tura => prihvaceneTure.Any(prihvacena => prihvacena.Tura!.ID == tura.ID));
            var noveTure = ture.Select(p => new {
            TuraId=p.ID,
            TipRobe = p.TipRobe!.Tip,
            TezinaRobe = p!.TezinaRobe,
            DuzinaRobe = p!.DuzinaRobe,
            SirinaRobe = p!.SirinaRobe,
            VisinaRobe = p!.VisinaRobe,
            ZapreminaRobe = p!.Zapremina,
            PocetnaGeografskaSirina = p!.PocetnaGeografskaSirina,
            PocetnaGeografskaDuzina = p!.PocetnaGeografskaDuzina,
            OdredisnaGeografskaSirina = p!.OdredisnaGeografskaSirina,
            OdredisnaGeografskaDuzina = p!.OdredisnaGeografskaDuzina,
            Status = p!.Status,
            Duzina = p!.Duzina,
            DatumPocetka = p!.DatumPocetka,
            PredvidjeniKraj = p!.PredvidjeniKraj,
            KompanijaNaziv = p.Kompanija!.Naziv
            });
            return Ok(noveTure);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
   }
   
   [Route("PosaljiPoruku")]
   [HttpGet]
     public async Task PosaljiPoruku()
    {
               var connectionId = await Context.ConnectionInfoo!
                .Where(p => p.korisnickoIme == "BoziCCCa")
                .Select(p => p.ConnedtionId)
                .FirstOrDefaultAsync();

            if (connectionId != null)
            {
                await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveMessage", "Dodeljena vam je nova tura!");
            }
     }

}
