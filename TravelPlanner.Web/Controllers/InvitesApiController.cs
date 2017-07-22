using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.BusinessLogic.Models;
using TravelPlanner.DomainModel;
using TravelPlanner.Web.Models;

namespace TravelPlanner.Web.Controllers
{
    [Authorize]
    public class InvitesApiController : Controller
    {
        private readonly ITripInviteService _inviteService;
        private readonly INotificationService _notificationService;

        public InvitesApiController(ITripInviteService inviteService, INotificationService notificationService)
        {
            _inviteService = inviteService;
            _notificationService = notificationService;
        }

        [Route("api/invites/send")]
        [HttpPost]
        public async Task<IActionResult> SendInvites([FromBody] InvitesModel model)
        {
            var tripInvites = new List<TripInvite>();
            model.Phones.ToList().ForEach(p => tripInvites.Add(new TripInvite()
            {
                InvitorId = model.InvitorUserId,
                Phone = p,
                TripId = model.TripId
            }));

            var invites = await _inviteService.AddInvites(tripInvites);
            await SendInvites(model.InvitorUserName, invites.ToList());

            return Ok();
        }

        [Route("api/invites/accept")]
        [HttpPost]
        public async Task<IActionResult> AcceptInvite([FromBody] int inviteId, [FromBody] Guid userId)
        {
            var tripInvite = await _inviteService.AcceptInvite(inviteId, userId);
            if (tripInvite == null) return BadRequest(ValidationResultCodes.InviteNotFound);
            return Ok(tripInvite.TripId);
        }

        private async Task SendInvites(string invitorUserName, IEnumerable<TripInvite> invites)
        {
            var inviteLink = $"http://{Request.Host}/acceptinvite/";
            var notifications = invites.ToList().Select(invite => new NotificationModel()
            {
                Text = $"Привет, {invitorUserName} приглашает вас в путешествие: {inviteLink + invite.Id}.",
                To = invite.Phone
            });

            await _notificationService.SendNotifications(notifications);
        }
    }
}