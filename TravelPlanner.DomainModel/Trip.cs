using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TravelPlanner.DomainModel
{
    public class Trip
    {
        public Trip()
        {
            Id = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            TripInvites = new List<TripInvite>();
            Users = new List<User>();
        }

        public string Id { get; set; }
        public Guid CreatorId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description  { get; set; }

        public virtual Chat Chat { get; set; }
        public virtual ICollection<TripInvite> TripInvites { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
