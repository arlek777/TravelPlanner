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

    public class InvitedUserTrip
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid TripId { get; set; }
    }

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

    public class Chat
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }

        public Trip Trip { get; set; }

        public ICollection<Message> Messages { get; set; }
    }

    public class Message
    {
        public Guid Id { get; set; }
        public Guid ChatId { get; set; }
        public Guid UserId { get; set; }
        public string Text { get; set; }

        public Chat Chat { get; set; }
        public User User { get; set; }
    }
}
