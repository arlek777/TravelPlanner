using System;
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
    }
}