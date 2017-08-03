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
    public class InviteApiController : Controller
    {
        private readonly ITripInviteService _inviteService;
        private readonly INotificationService _notificationService;

        public InviteApiController(ITripInviteService inviteService, INotificationService notificationService)
        {
            _inviteService = inviteService;
            _notificationService = notificationService;
        }

        [Route("api/invite/send")]
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

        [Route("api/invite/accept")]
        [HttpPost]
        public async Task<IActionResult> AcceptInvite([FromBody] AcceptInviteModel model)
        {
            var tripInvite = await _inviteService.AcceptInvite(model.InviteId, model.UserId);
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