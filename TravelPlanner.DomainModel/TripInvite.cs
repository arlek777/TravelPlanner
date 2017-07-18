using System;
using System.ComponentModel.DataAnnotations;

namespace TravelPlanner.DomainModel
{
    public class TripInvite
    {
        public TripInvite()
        {
            Id = new Random().Next(11111, 99999);
        }

        public int Id { get; set; }

        [Required]
        public Guid InvitorId { get; set; }

        [Required]
        public int TripId { get; set; }

        [Required]
        public string Phone { get; set; }

        public Trip Trip { get; set; }
    }
}