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

        public async Task<Guid> Create(Trip model)
        {
            _repository.Add(model);
            await _repository.SaveChanges();

            return model.Id;
        }

        public async Task Remove(Guid id, Guid userId)
        {
            var trip = await GetTrip(id, userId);
            _repository.Remove(trip);
            await _repository.SaveChanges();
        }

        public Task<Guid> Update(Trip model)
        {
            throw new NotImplementedException();
        }

        public async Task<Trip> Get(Guid id, Guid userId)
        {
            return await GetTrip(id, userId);
        }

        public async Task<IEnumerable<Trip>> GetInvited(Guid userId)
        {
            var user = await _repository.Find<User>(u => u.Id == userId);
            return user.Trips.ToList();
        }

        public async Task<IEnumerable<Trip>> GetOwn(Guid userId)
        {
            return await _repository.GetList<Trip>(t => t.CreatorId == userId);
        }

        private async Task<Trip> GetTrip(Guid id, Guid userId)
        {
            var trip = await _repository.Find<Trip>(t => t.Id == id && t.CreatorId == userId);
            return trip;
        }
    }
}