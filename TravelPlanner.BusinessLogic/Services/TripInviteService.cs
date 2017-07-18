using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.DataAccess;
using TravelPlanner.DomainModel;

namespace TravelPlanner.BusinessLogic.Services
{
    public class TripInviteService : ITripInviteService
    {
        private readonly IGenericRepository _repository;

        public TripInviteService(IGenericRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TripInvite>> AddInvites(IEnumerable<TripInvite> invites)
        {
            var tripId = invites.FirstOrDefault().TripId;

            var uniqueInvites = await AddUniqueInvites(invites, tripId);
            return uniqueInvites;
        }

        public async Task<TripInvite> AcceptInvite(string inviteId)
        {
            var tripInvite = await Get(inviteId);
            if (tripInvite != null)
            {
                _repository.Remove(tripInvite);
                await _repository.SaveChanges();
            }

            return tripInvite;
        }

        public async Task<TripInvite> Get(string inviteId)
        {
            var trip = await _repository.Find<TripInvite>(t => t.InviteId == inviteId);
            return trip;
        }

        private async Task<List<TripInvite>> AddUniqueInvites(IEnumerable<TripInvite> invites, Guid tripId)
        {
            var trip = await _repository.Find<Trip>(t => t.Id == tripId);
            var uniqueInvites = invites.Where(invite => trip.TripInvites.All(t => t.Phone != invite.Phone)).ToList();

            uniqueInvites.ForEach(invite => trip.TripInvites.Add(invite));

            await _repository.SaveChanges();
            return uniqueInvites;
        }
    }
}