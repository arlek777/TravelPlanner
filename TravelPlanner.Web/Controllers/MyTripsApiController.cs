using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.DomainModel;
using TravelPlanner.Web.Models;

namespace TravelPlanner.Web.Controllers
{
    [Authorize]
    public class MyTripsApiController : Controller
    {
        private readonly ITripService _tripService;

        public MyTripsApiController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [Route("api/mytrips/create")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TripModel model)
        {
            var id = await _tripService.Create(new Trip()
            {
                CreatorId = model.CreatorId,
                Title = model.Title,
                Description = model.Description
            });

            return Ok(id);
        }

        [Route("api/mytrips/get/{id}/{userId}")]
        [HttpGet]
        public async Task<IActionResult> GetTrip(Guid id, Guid userId)
        {
            var trip = await _tripService.Get(id, userId);
            return Ok(ConvertToTripModel(trip));
        }

        [Route("api/mytrips/getown/{userId}")]
        [HttpGet]
        public async Task<IActionResult> GetOwnTrips(Guid userId)
        {
            var trips = (await _tripService.GetOwn(userId)).Select(ConvertToTripModel);
            return Ok(trips);
        }

        [Route("api/mytrips/getinvited/{userId}")]
        [HttpGet]
        public async Task<IActionResult> GetInvitedTrips(Guid userId)
        {
            var trips = (await _tripService.GetInvited(userId)).Select(ConvertToTripModel);
            return Ok(trips);
        }

        [Route("api/mytrips/remove")]
        [HttpPost]
        public async Task<IActionResult> Remove([FromBody] Guid id, Guid userId)
        {
            await _tripService.Remove(id, userId);
            return Ok();
        }

        private TripModel ConvertToTripModel(Trip trip)
        {
            return new TripModel()
            {
                Id = trip.Id,
                CreatorId = trip.CreatorId,
                Title = trip.Title,
                Description = trip.Description
            };
        }
    }
}