using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelPlanner.DomainModel
{
    public class TripInvite
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public Guid InvitorId { get; set; }

        [Required]
        public string TripId { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string InviteId { get; set; }

        public Trip Trip { get; set; }
    }
}