

using System.Text;
using Microsoft.AspNetCore.Mvc;


namespace Projektito.Controllers;


[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private IConfiguration Config{ get; set; }
    public Context Context { get; set; }

    public LoginController(IConfiguration config,Context context)
    {
        Config=config;
        Context=context;
    }


    [AllowAnonymous]
    [HttpPost] 
    [Route("LoginVozac/{email}/{password}")]
    public async Task<IActionResult> LoginVozac(string email,string password)
    {
            var user=await Context.Vozac!.Where(p=>p.Email==email).FirstOrDefaultAsync();
            
            if(user!=null)
            {
                var res=BCrypt.Net.BCrypt.Verify(password,user.Sifra);
                if(res){
                    var token=GenerateVozac(user);
                    return Ok(token);
                }
                else 
                {
                    return BadRequest("Pogresna sifra!");
                }
            }
            else
            {
                return BadRequest("Pogresna Email adresa!");
            }
    }

    private string GenerateVozac(Vozac v)
    {
        var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:Key"]!));
        var creditendals=new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

        var claims=new[]
        {
            new Claim(ClaimTypes.NameIdentifier,v.KorisnickoIme),
            new Claim(ClaimTypes.Email,v.Email),
            new Claim(ClaimTypes.GivenName,v.Ime),
            new Claim(ClaimTypes.Surname,v.Prezime),
            new Claim(ClaimTypes.Role,"Vozac")
        };

        var token=new JwtSecurityToken(Config["Jwt:Issuer"],Config["Jwt:Audience"],claims,expires:DateTime.Now.AddMinutes(30),signingCredentials:creditendals);

        var token2=new JwtSecurityTokenHandler().WriteToken(token);


        return token2;
    }

    [AllowAnonymous]
    [HttpPost] 
    [Route("LoginKompanija/{email}/{password}")]
    public async Task<IActionResult> LoginKompanija(string email,string password)
    {
            var user=await Context.Kompanija!.Where(p=>p.Email==email).FirstOrDefaultAsync();
            
            if(user!=null)
            {
                var res=BCrypt.Net.BCrypt.Verify(password,user.Sifra);
                if(res){
                    var token=GenerateKompanija(user);
                    return Ok(token);
                }
                else 
                {
                    return BadRequest("Pogresna sifra!");
                }
            }
            else
            {
                return BadRequest("Pogresna Email adresa!");
            }
    }

      private string GenerateKompanija(Kompanija k)
    {
        var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:Key"]!));
        var creditendals=new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

        var claims=new[]
        {
            new Claim(ClaimTypes.NameIdentifier,k.KorisnickoIme),
            new Claim(ClaimTypes.Email,k.Email),
            new Claim(ClaimTypes.GivenName,k.Naziv),
            new Claim(ClaimTypes.Role,"Kompanija")
        };

        var token=new JwtSecurityToken(Config["Jwt:Issuer"],Config["Jwt:Audience"],claims,expires:DateTime.Now.AddMinutes(30),signingCredentials:creditendals);

        var token2=new JwtSecurityTokenHandler().WriteToken(token);


        return token2;
    }

    [AllowAnonymous]
    [HttpPost] 
    [Route("LoginDispecer/{email}/{password}")]
    public async Task<IActionResult> LoginDispecer(string email,string password)
    {
            var user=await Context.Dispecer!.Where(p=>p.Email==email).FirstOrDefaultAsync();
            
            if(user!=null)
            {
                var res=BCrypt.Net.BCrypt.Verify(password,user.Sifra);
                if(res){
                    var token=GenerateDispecer(user);
                    return Ok(token);
                }
                else 
                {
                    return BadRequest("Pogresna sifra!");
                }
            }
            else
            {
                return BadRequest("Pogresna Email adresa!");
            }
    }

    private string GenerateDispecer(Dispecer d)
    {
        var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:Key"]!));
        var creditendals=new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

        var claims=new[]
        {
            new Claim(ClaimTypes.NameIdentifier,d.KorisnickoIme),
            new Claim(ClaimTypes.Email,d.Email),
            new Claim(ClaimTypes.GivenName,d.Ime),
            new Claim(ClaimTypes.Surname,d.Prezime),
            new Claim(ClaimTypes.Role,"Dispecer")
        };

        var token=new JwtSecurityToken(Config["Jwt:Issuer"],Config["Jwt:Audience"],claims,expires:DateTime.Now.AddMinutes(30),signingCredentials:creditendals);

        var token2=new JwtSecurityTokenHandler().WriteToken(token);


        return token2;
    }

}
