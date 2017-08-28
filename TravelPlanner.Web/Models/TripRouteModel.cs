using System.Collections.Generic;

namespace TravelPlanner.Web.Models
{
    public class TripRouteModel
    {
        public double Distance { get; set; }
        public List<TripWaypointModel> TripWaypoints { get; set; }
    }
}