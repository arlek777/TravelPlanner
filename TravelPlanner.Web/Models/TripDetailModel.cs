using System.Collections.Generic;

namespace TravelPlanner.Web.Models
{
    public class TripDetailModel: TripModel
    {
        public TripDetailModel()
        {
            Users = new List<UserModel>();
        }

        public List<UserModel> Users { get; set; }
        public string Description { get; set; }
        public string MapUrl { get; set; }
    }
}