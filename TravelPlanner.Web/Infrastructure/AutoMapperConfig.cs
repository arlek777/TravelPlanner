﻿using AutoMapper;
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

                c.CreateMap<Message, MessageModel>()
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.User.UserName));
                c.CreateMap<MessageModel, Message>();
            });

            Mapper.AssertConfigurationIsValid();
        }
    }
}
