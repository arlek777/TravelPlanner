using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using TravelPlanner.BusinessLogic.IdentityManagers;
using TravelPlanner.DomainModel;

namespace TravelPlanner.Web.Controllers
{
    public class RegistrationModel
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
    }

    public class AuthorizationApiController : Controller
    {
        private readonly ApplicationUserManager _userManager;

        public AuthorizationApiController(ApplicationUserManager userManager)
        {
            _userManager = userManager;
        }

        [Route("api/auth/register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegistrationModel model)
        {
            IdentityResult result = await _userManager.CreateAsync(new User()
            {
                Email = model.Email,
                Phone = model.Phone,
                UserName = model.UserName
            }, model.Password);

            return Ok(result);
        }
    }
}
