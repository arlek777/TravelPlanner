using System.Collections.Generic;
using System.Threading.Tasks;
using TravelPlanner.DomainModel;

namespace TravelPlanner.BusinessLogic.Interfaces
{
    public interface ITripInviteService
    {
        Task<IEnumerable<TripInvite>> AddInvites(IEnumerable<TripInvite> invites);
        Task<TripInvite> AcceptInvite(string inviteId);
        Task<TripInvite> Get(string inviteId);
    }
}