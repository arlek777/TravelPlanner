using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.DataAccess;
using TravelPlanner.DomainModel;

namespace TravelPlanner.BusinessLogic.Services
{
    public class SightObjectService : ISightObjectService
    {
        private readonly IGenericRepository _repository;

        public SightObjectService(IGenericRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<SightObject>> Get()
        {
            var sights = await _repository.GetAll<SightObject>();
            if (!sights.Any())
            {
                sights = SightsParser.Parse();
                foreach (var sightObject in sights)
                {
                    _repository.Add(sightObject);
                }

                await _repository.SaveChanges();
            }

            return sights.ToList();
        }
    }
}