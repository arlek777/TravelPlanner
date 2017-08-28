using System;
using System.ComponentModel.DataAnnotations;

namespace TravelPlanner.DomainModel
{
    public class LatLng
    {
        public Guid Id { get; set; }

        [Required]
        public double Lat { get; set; }
        [Required]
        public double Long { get; set; }
    }
}