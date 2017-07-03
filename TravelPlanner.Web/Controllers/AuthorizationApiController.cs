using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using TravelPlanner.BusinessLogic.IdentityManagers;
using TravelPlanner.BusinessLogic.Models;
using TravelPlanner.DomainModel;
using TravelPlanner.Web.Models;

namespace TravelPlanner.Web.Controllers
{
    public class AuthorizationApiController : BaseApiController
    {
        private readonly ApplicationUserManager _userManager;

        public AuthorizationApiController(ApplicationUserManager userManager)
        {
            _userManager = userManager;
        }

        [Route("api/auth/login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginModel loginModel)
        {
            var user = await _userManager.FindByEmailAsync(loginModel.Email);
            if (user == null)
            {
                return GetActionResult(new RequestResult(new [] { "User with these credentials does not exist." }));
            }
            bool passwordValid = await _userManager.CheckPasswordAsync(user, loginModel.Password);
            if (!passwordValid)
            {
                return GetActionResult(new RequestResult(new[] { "User with these credentials does not exist." }));//TODO localization
            }

            return Ok();
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

            return GetActionResult(result);
        }
    }
}
