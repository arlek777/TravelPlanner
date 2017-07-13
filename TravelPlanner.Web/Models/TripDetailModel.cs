using System;
using System.Collections.Generic;

namespace TravelPlanner.Web.Models
{
    public class TripDetailModel
    {
        public TripDetailModel()
        {
            Users = new List<UserModel>();
        }

        public Guid Id { get; set; }
        public Guid CreatorId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public List<UserModel> Users { get; set; }
    }
}