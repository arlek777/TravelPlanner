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
                c.CreateMap<Trip, TripModel>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => GuidHelper.ToShort(src.Id)));
                c.CreateMap<TripModel, Trip>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => GuidHelper.ToFull(src.Id)));

                c.CreateMap<Trip, TripDetailModel>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => GuidHelper.ToShort(src.Id)));
                c.CreateMap<TripDetailModel, Trip>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => GuidHelper.ToFull(src.Id)));

                c.CreateMap<User, UserModel>().ReverseMap();
            });

            Mapper.AssertConfigurationIsValid();
        }
    }
}
