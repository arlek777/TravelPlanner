using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelPlanner.DomainModel
{
    public class TripInvite
    {
        public TripInvite()
        {
            Id = new Random().Next(1000, 9999);
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [Required]
        public Guid InvitorId { get; set; }

        [Required]
        public int TripId { get; set; }

        [Required]
        public string Phone { get; set; }

        public virtual Trip Trip { get; set; }
    }
}