using System;

namespace TravelPlanner.Web.Models
{
    public class TripModel
    {
        public Guid Id { get; set; }
        public Guid CreatorId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}