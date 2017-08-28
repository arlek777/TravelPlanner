using System;
using System.ComponentModel.DataAnnotations;

namespace TravelPlanner.DomainModel
{
    public class SightMapMarker
    {
        public Guid Id { get; set; }
        public Guid LatLngId { get; set; }

        [Required]
        public string Label { get; set; }
        public string Description { get; set; }

        public virtual LatLng LatLng { get; set; }
    }
}