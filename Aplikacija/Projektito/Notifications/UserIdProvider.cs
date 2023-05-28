using Microsoft.AspNetCore.SignalR;

namespace Notifications
{
  public class UserIdProvider : IUserIdProvider
  {
    public string GetUserId(HubConnectionContext connection)
    {
       var userId = connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return userId!;
    }
  }
}