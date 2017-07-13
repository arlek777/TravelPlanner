using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelPlanner.DomainModel
{
    public class TripInvite
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid TripId { get; set; }
        public Guid? UserId { get; set; }
        [Required]
        public string Phone { get; set; }
        public bool IsAccepted { get; set; }
        public User User { get; set; }
        public Trip Trip { get; set; }
    }
}