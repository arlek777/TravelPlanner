using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TravelPlanner.Web.Controllers
{
    [Authorize]
    public class MyTripsApiController : Controller
    {
        [Route("api/mytrips/test")]
        [HttpGet]
        public IActionResult Test()
        {
            return Ok("Test");
        }
    }
}