using System;

namespace TravelPlanner.DomainModel
{
    public class Trip
    {
        public Guid Id { get; set; }
        public Guid CreatorId { get; set; }
        public Guid ChatId { get; set; }
        public string Title { get; set; }
        public string Description  { get; set; }
    }

    public class Invitation
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }
        public Guid? UserId { get; set; }
        public string Phone { get; set; }
        public bool IsAccepted => UserId.HasValue;
    }

    public class Chat
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }
    }

    public class Message
    {
        public Guid Id { get; set; }
        public Guid ChatId { get; set; }
        public Guid UserId { get; set; }
        public string Text { get; set; }
    }
}
