using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelPlanner.DomainModel;

namespace TravelPlanner.BusinessLogic.Interfaces
{
    public interface ITripService
    {
        Task<string> Create(Trip model);
        Task Remove(string id, Guid userId);
        Task<string> Update(Trip model);
        Task<Trip> Get(string id, Guid userId);
        Task<IEnumerable<Trip>> GetInvited(Guid userId);
        Task<IEnumerable<Trip>> GetOwn(Guid userId);
    }
}
