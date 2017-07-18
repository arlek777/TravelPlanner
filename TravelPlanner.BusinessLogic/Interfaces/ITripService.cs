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
        Task<Guid> Create(Trip model);
        Task Remove(Guid id, Guid userId);
        Task<Guid> Update(Trip model);
        Task<Trip> Get(Guid id, Guid userId);
        Task<IEnumerable<Trip>> GetInvited(Guid userId);
        Task<IEnumerable<Trip>> GetOwn(Guid userId);
    }
}
