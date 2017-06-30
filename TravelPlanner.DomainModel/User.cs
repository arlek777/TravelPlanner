using System;
using System.Collections.Generic;

namespace TravelPlanner.DomainModel
{
    public class User
    {
        public Guid Id { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public ICollection<Trip> CreatedTrips { get; set; }
        public ICollection<InvitedUserTrip> InvitedUserTrips { get; set; }
    }
}