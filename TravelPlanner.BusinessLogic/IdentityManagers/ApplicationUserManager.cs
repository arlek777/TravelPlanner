using System;
using Microsoft.AspNet.Identity;
using TravelPlanner.DomainModel;

namespace TravelPlanner.BusinessLogic.IdentityManagers
{
    public class ApplicationUserManager : UserManager<User, Guid>
    {
        public ApplicationUserManager(IUserStore<User, Guid> store, 
            IIdentityValidator<User> userValidator, IIdentityValidator<string> passwordValidator) : base(store)
        {
            base.UserValidator = userValidator;
            base.PasswordValidator = passwordValidator;
        }
    }
}