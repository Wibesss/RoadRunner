using System.Collections.Concurrent;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Models;

namespace Notifications
{   

    public class NotificationsHub : Hub 
    {
        public Context Contextt {get; set;}
        public readonly IHubContext<NotificationsHub> _hubContext;

      public NotificationsHub(Context context, IHubContext<NotificationsHub> hubContext)
    {
        Contextt = context;
        _hubContext = hubContext;
    }

        [Authorize]
        public override async Task OnConnectedAsync()
         {

            var token="";
         if(Context!.GetHttpContext()!.Request.Cookies.TryGetValue("Token", out string? cookieValue))
         {
            token =cookieValue;
         }
            var jwtHendler= new JwtSecurityTokenHandler();
            var jwtToken = jwtHendler.ReadJwtToken(token); 

            var username= jwtToken.Claims.FirstOrDefault(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")!.Value;
            var connectionId = Context.ConnectionId;

         ConnectionInfoo ci=new ConnectionInfoo();
         ci.korisnickoIme=username;
         ci.ConnedtionId=connectionId;

         var brisi= await Contextt.ConnectionInfoo!.Where(p=>p.korisnickoIme==username).ToListAsync();

         foreach(var b in brisi)
         {
            Contextt.Remove(b);
         }

         await Contextt.AddAsync(ci);
         await Contextt.SaveChangesAsync();



        // Use the username for identification or any other processing

        await base.OnConnectedAsync();
          }
            public override async Task OnDisconnectedAsync(Exception? exception)
            {
                 var token="";
         if(Context!.GetHttpContext()!.Request.Cookies.TryGetValue("Token", out string? cookieValue))
         {
            token =cookieValue;
         }
            var jwtHendler= new JwtSecurityTokenHandler();
            var jwtToken = jwtHendler.ReadJwtToken(token); 

            var username= jwtToken.Claims.FirstOrDefault(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")!.Value;

        var user = await Contextt.ConnectionInfoo!.Where(p=>p.korisnickoIme==username).FirstOrDefaultAsync();
        if (user != null)
        {
            Contextt.Remove(user);
            await Contextt.SaveChangesAsync();
        }

        await base.OnDisconnectedAsync(exception);
           }
       
    }
}