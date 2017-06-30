﻿using Microsoft.EntityFrameworkCore;
using TravelPlanner.DomainModel;

namespace TravelPlanner.DataAccess
{
    public class TravelPlannerDbContext: DbContext
    {
        public TravelPlannerDbContext(DbContextOptions<TravelPlannerDbContext> options) : base(options)
        {
        }

        public DbSet<Trip> Trips { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<InvitedUserTrip> InvitedUserTrips { get; set; }
    }
}