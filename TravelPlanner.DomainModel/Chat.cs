using System;
using System.Collections.Generic;

namespace TravelPlanner.DomainModel
{
    public class Chat
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }

        public Trip Trip { get; set; }

        public ICollection<Message> Messages { get; set; }
    }
}