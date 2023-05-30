

using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Models.Responses;

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
    [Route("Login/{email}/{password}")]
    public async Task<IActionResult> Login(string email,string password)
    {
            var uservozac=await Context.Vozac!.Where(p=>p.Email==email).FirstOrDefaultAsync();
            var userkompanija=await Context.Kompanija!.Where(p=>p.Email==email).FirstOrDefaultAsync();
            var userdispecer=await Context.Dispecer!.Where(p=>p.Email==email).FirstOrDefaultAsync();
            if(uservozac!=null || userkompanija!=null || userdispecer!=null)
            {
                    if(uservozac!=null)
                    {
                        var user=uservozac;
                        var res=BCrypt.Net.BCrypt.Verify(password,user.Sifra);
                        if(res)
                        {
                            var token=GenerateVozac(user);
                            var refresh=GenerateRefresh();
                            CreateCookie(token);
                            return Ok(new {
                                id = user.ID,
                                korisnickoIme = user.KorisnickoIme,
                                email = user.Email,
                                role = "Vozac"
                            });
                            
                        }
                        else 
                        {
                            return BadRequest("Pogresna sifra!");
                        }
                    }
                    else if(userkompanija!=null)
                    {
                        var user=userkompanija;
                        var res=BCrypt.Net.BCrypt.Verify(password,user.Sifra);
                        if(res)
                        {
                            var token=GenerateKompanija(user);
                            var refresh=GenerateRefresh();
                            CreateCookie(token);
                            return Ok(new {
                                id = user.ID,
                                korisnickoIme = user.KorisnickoIme,
                                email = user.Email,
                                role = "Kompanija"
                            });
                        }
                        else 
                        {
                            return BadRequest("Pogresna sifra!");
                        }
                    }
                    else if(userdispecer!=null)
                    {
                        var user=userdispecer;
                        var res=BCrypt.Net.BCrypt.Verify(password,user.Sifra);
                        if(res)
                        {
                            var token=GenerateDispecer(user);
                            var refresh=GenerateRefresh();
                            CreateCookie(token);
                            return Ok(new {
                                id = user.ID,
                                korisnickoIme = user.KorisnickoIme,
                                email = user.Email,
                                role = "Dispecer"
                            });
                        }
                        else 
                        {
                            return BadRequest("Pogresna sifra!");
                        }    
                        }
                        else
                        {
                            return BadRequest("Doslo je do greske!");
                        }
            }
            else
            {
                return BadRequest("Pogresno korisnicko ime!");
            }
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("Profile")]
    public IActionResult Profile()
    {
        var cookie="";
        if (Request.Cookies.TryGetValue("Token", out string? cookieValue))
        {
            cookie=cookieValue;
        }
        if(cookie!="")
        {
            var jwtHendler= new JwtSecurityTokenHandler();
            var jwtToken = jwtHendler.ReadJwtToken(cookie);
            
            var idClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "Id");
            var roleClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
            var emailClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
            var userNameClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
            if (idClaim != null && roleClaim != null)
            {
                var idValue = idClaim.Value;
                var roleValue = roleClaim.Value;
                var emailValue = emailClaim?.Value;
                var userNameValue = userNameClaim?.Value;
                var profileData = new { Id = idValue, Role = roleValue, Email = emailValue, korisnickoIme = userNameValue };
                return Ok(profileData);
            }
            else
            {
                return Ok(null);
            }   
        }

        return Ok(null);
    }
    
    [Authorize]
    [HttpPost] 
    [Route("SadCeDaNestanem")]
    public IActionResult Logout()
    {
        try
        {
            
             Response.Cookies.Delete("Token");
            return Ok("Uspesno ste izlogovani!");
            
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    private string GenerateVozac(Vozac v)
    {
        var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:Key"]!));
        var creditendals=new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

        var claims=new List<Claim>
        {
            new (ClaimTypes.NameIdentifier,v.KorisnickoIme),
            new (ClaimTypes.Email,v.Email),
            new (ClaimTypes.Role,"Vozac"),
            new("Id",v.ID.ToString())
        };
    
        var token=new JwtSecurityToken(Config["Jwt:Issuer"],Config["Jwt:Audience"],claims,expires:DateTime.Now.AddHours(1),signingCredentials:creditendals);

        var token2=new JwtSecurityTokenHandler().WriteToken(token);

        return token2;
    }

      private string GenerateKompanija(Kompanija k)
    {
        var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:Key"]!));
        var creditendals=new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

        var claims=new[]
        {
            new("Id",k.ID.ToString()),
            new Claim(ClaimTypes.NameIdentifier,k.KorisnickoIme),
            new Claim(ClaimTypes.Email,k.Email),
            new Claim(ClaimTypes.Role,"Kompanija")
        };

        var token=new JwtSecurityToken(Config["Jwt:Issuer"],Config["Jwt:Audience"],claims,expires:DateTime.Now.AddHours(1),signingCredentials:creditendals);

        var token2=new JwtSecurityTokenHandler().WriteToken(token);


        return token2;
    }

    private string GenerateDispecer(Dispecer d)
    {
        var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:Key"]!));
        var creditendals=new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

        var claims=new[]
        {
            new("Id",d.ID.ToString()),
            new Claim(ClaimTypes.NameIdentifier,d.KorisnickoIme),
            new Claim(ClaimTypes.Email,d.Email),
            new Claim(ClaimTypes.Role,"Dispecer")
        };

        var token=new JwtSecurityToken(Config["Jwt:Issuer"],Config["Jwt:Audience"],claims,DateTime.Now,DateTime.Now.AddHours(1),signingCredentials:creditendals);

        var token2=new JwtSecurityTokenHandler().WriteToken(token);

        return token2;
    }

    private string GenerateRefresh()
    {
        var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:RefreshKey"]!));
        var creditendals=new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256);

        var token=new JwtSecurityToken(Config["Jwt:Issuer"],Config["Jwt:Audience"],null,DateTime.Now,DateTime.Now.AddMonths(6),signingCredentials:creditendals);

        var token2=new JwtSecurityTokenHandler().WriteToken(token);

        return token2;
    }


    // [HttpPost]
    // [Route("Refresh/{refreshRequest}/{role}")]
    // public async Task<IActionResult> Refresh(string refreshRequest,string role)
    // {
    //     try
    //     {
    //         bool isValid=Validate(refreshRequest);
    //         if(!isValid)
    //         {
    //             return BadRequest("Nije validan refresh token!");
    //         }
    //         else
    //         {
    //             if(role=="Dispecer")
    //             {
                    
    //             }
    //         }

    //     }
    //     catch(Exception ex)
    //     {
    //         return BadRequest(ex.Message);
    //     }
    // }


    private bool Validate(string token)
    {
        JwtSecurityTokenHandler tokenHandler=new JwtSecurityTokenHandler();
        TokenValidationParameters parameters= new TokenValidationParameters()
        {
            ValidIssuer=Config["Jwt:Issuer"],
            ValidAudience=Config["Jwt:Audience"],
            IssuerSigningKey=new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(Config["Jwt:RefreshKey"]!)),
            ValidateIssuer=true,
            ValidateAudience=true,
            ValidateLifetime=true,
            ValidateIssuerSigningKey=true,
            ClockSkew=TimeSpan.Zero
        };
        try
        {
            tokenHandler.ValidateToken(token,parameters,out SecurityToken validatedToken);
            return true;
        }
        catch(Exception)
        {
            return false;
        }
    }

       private  void CreateCookie(string val)
    {
        string key="Token";
        string value=val;
        CookieOptions co=new CookieOptions
        {
            Expires=DateTime.Now.AddHours(1)
        };
        HttpContext.Response.Cookies.Append(key,value,co);
    }

    private void ReadCookie()
    {
        string key="Token";
        var val=Request.Cookies[key];
    }

    private void RemoveCookie()
    {
            Response.Cookies.Delete("Token");
    }


}
