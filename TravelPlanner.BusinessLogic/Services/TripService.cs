using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.DataAccess;
using TravelPlanner.DomainModel;

namespace TravelPlanner.BusinessLogic.Services
{
    public class TripService : ITripService
    {
        private readonly IGenericRepository _repository;

        public TripService(IGenericRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> Create(Trip model)
        {
            var currentUser = await _repository.Find<User>(u => u.Id == model.CreatorId);

            _repository.Add(model);
            model.Users.Add(currentUser);
            await _repository.SaveChanges();

            return model.Id;
        }

        public async Task Remove(string id, Guid userId)
        {
            var trip = await GetTrip(id, userId);
            _repository.Remove(trip);
            await _repository.SaveChanges();
        }

        public Task<string> Update(Trip model)
        {
            throw new NotImplementedException();
        }

        public async Task<Trip> Get(string id, Guid userId)
        {
            return await GetTrip(id, userId);
        }

        public async Task<IEnumerable<Trip>> GetInvited(Guid userId)
        {
            var user = await _repository.Find<User>(u => u.Id == userId);
            return user.Trips.Where(t => t.CreatorId != userId).ToList();
        }

        public async Task<IEnumerable<Trip>> GetOwn(Guid userId)
        {
            return await _repository.GetList<Trip>(t => t.CreatorId == userId);
        }

        private async Task<Trip> GetTrip(string id, Guid userId)
        {
            var trip = await _repository.Find<Trip>(t => t.Id == id && t.CreatorId == userId);
            return trip;
        }
    }
}