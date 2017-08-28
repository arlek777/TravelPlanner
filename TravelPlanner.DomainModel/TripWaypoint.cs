using System;
using System.ComponentModel.DataAnnotations;

namespace TravelPlanner.DomainModel
{
    public class TripWaypoint
    {
        public Guid Id { get; set; }
        public Guid TripRouteId { get; set; }
        public Guid LatLngId { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual LatLng LatLng { get; set; }
        public virtual TripRoute TripRoute { get; set; }
    }
}