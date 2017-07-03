using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using TravelPlanner.BusinessLogic.Models;

namespace TravelPlanner.Web.Controllers
{
    public class BaseApiController : Controller
    {
        protected IActionResult GetActionResult(IdentityResult result)
        {
            if(result.Succeeded) return Ok();
            return BadRequest(result);
        }
    }
}