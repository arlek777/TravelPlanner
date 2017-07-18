using System;

namespace TravelPlanner.Web.Models
{
    public class InvitesModel
    {
        public string[] Phones { get; set; }
        public Guid InvitorUserId { get; set; }
        public string TripId { get; set; }
        public string InvitorUserName { get; set; }
    }
}