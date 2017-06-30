using System;

namespace TravelPlanner.DomainModel
{
    public class Invitation
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }
        public Guid? UserId { get; set; }
        public string Phone { get; set; }
        public bool IsAccepted => UserId.HasValue;

        public User User { get; set; }
        public Trip Trip { get; set; }
    }
}