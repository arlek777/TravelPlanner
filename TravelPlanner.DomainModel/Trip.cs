using System;
using System.Collections.Generic;

namespace TravelPlanner.DomainModel
{
    public class Trip
    {
        public Guid Id { get; set; }
        public Guid CreatorId { get; set; }
        public Guid ChatId { get; set; }
        public string Title { get; set; }
        public string Description  { get; set; }

        public User Creator { get; set; }
        public Chat Chat { get; set; }
        public ICollection<Invitation> Invitations { get; set; }
        public ICollection<InvitedUserTrip> InvitedUserTrips { get; set; }
    }
}
