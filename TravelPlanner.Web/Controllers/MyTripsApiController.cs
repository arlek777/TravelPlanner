using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.DomainModel;
using TravelPlanner.Web.Models;

namespace TravelPlanner.Web.Controllers
{
    [Authorize]
    public class InvitesApiController : Controller
    {
        public async Task<IActionResult> SendInvites([FromBody] string[] model)
        {
            // TODO
            // 1. Look through all phones
            // 2. If a user is found with it - create trip invite with him and add it to the Trip users
            // 3. If a user is new - create a trip invite without him and add it to the Trip users
            // 4. Creating TripInvite - generate short link, attach all data TripId, UserId, Phone
            // 5. Send invite with link and by invite provider
            // 6. Return list of new users
        }
    }

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
            return Ok(Mapper.Map<TripDetailModel>(trip));
        }

        [Route("api/mytrips/getown/{userId}")]
        [HttpGet]
        public async Task<IActionResult> GetOwnTrips(Guid userId)
        {
            var trips = (await _tripService.GetOwn(userId)).Select(Mapper.Map<TripModel>);
            return Ok(trips);
        }

        [Route("api/mytrips/getinvited/{userId}")]
        [HttpGet]
        public async Task<IActionResult> GetInvitedTrips(Guid userId)
        {
            var trips = (await _tripService.GetInvited(userId)).Select(Mapper.Map<TripModel>);
            return Ok(trips);
        }

        [Route("api/mytrips/remove")]
        [HttpPost]
        public async Task<IActionResult> Remove([FromBody] Guid id, Guid userId)
        {
            await _tripService.Remove(id, userId);
            return Ok();
        }
    }
}