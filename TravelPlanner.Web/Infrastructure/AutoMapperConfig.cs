using AutoMapper;
using TravelPlanner.BusinessLogic.Extensions;
using TravelPlanner.DomainModel;
using TravelPlanner.Web.Models;

namespace TravelPlanner.Web.Infrastructure
{
    public static class AutoMapperConfig
    {
        public static void Configure()
        {
            Mapper.Initialize(c =>
            {
                c.CreateMap<Trip, TripModel>().ReverseMap();
                c.CreateMap<Trip, TripDetailModel>().ReverseMap();
                c.CreateMap<User, UserModel>().ReverseMap();
            });

            Mapper.AssertConfigurationIsValid();
        }
    }
}
