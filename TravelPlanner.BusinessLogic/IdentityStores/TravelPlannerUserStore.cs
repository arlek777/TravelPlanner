using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using TravelPlanner.DataAccess;
using TravelPlanner.DomainModel;

namespace TravelPlanner.BusinessLogic.IdentityStores
{
    public class TravelPlannerUserStore : IUserStore<User, Guid>, IUserPasswordStore<User, Guid>
    {
        private readonly IGenericRepository _repository;

        public TravelPlannerUserStore(IGenericRepository repository)
        {
            _repository = repository;
        }

        #region IUserStore

        public void Dispose()
        {
            _repository.Dispose();
        }

        public async Task CreateAsync(User user)
        {
            _repository.Add(user);
            await _repository.SaveChanges();
        }

        public async Task UpdateAsync(User user)
        {
            var userToUpdate = await _repository.Find<User>(u => u.Id == user.Id);
            userToUpdate.Email = user.Email;
            userToUpdate.Phone = user.Phone;
            userToUpdate.UserName = user.UserName;
            await _repository.SaveChanges();
        }

        public async Task DeleteAsync(User user)
        {
            _repository.Remove(user);
            await _repository.SaveChanges();
        }

        public async Task<User> FindByIdAsync(Guid userId)
        {
            return await _repository.Find<User>(u => u.Id == userId);
        }

        public async Task<User> FindByNameAsync(string userName)
        {
            return await _repository.Find<User>(u => u.UserName == userName);
        }

        #endregion IUserStore

        #region IUserPasswordStore

        public Task SetPasswordHashAsync(User user, string passwordHash)
        {
            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }
        public Task<string> GetPasswordHashAsync(User user)
        {
            return Task.FromResult(user.PasswordHash);
        }
        public Task<bool> HasPasswordAsync(User user)
        {
            return Task.FromResult(!String.IsNullOrEmpty(user.PasswordHash));
        }

        #endregion
    }
}

