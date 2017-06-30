using System;

namespace TravelPlanner.DomainModel
{
    public class InvitedUserTrip
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid TripId { get; set; }
    }
}