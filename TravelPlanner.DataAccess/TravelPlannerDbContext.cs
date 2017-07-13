using System.Data.Entity;
using TravelPlanner.DomainModel;

namespace TravelPlanner.DataAccess
{
    public class TravelPlannerDbContext: DbContext
    {
        static TravelPlannerDbContext()
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<TravelPlannerDbContext>());
        }

        public TravelPlannerDbContext(string connectionStr) : base(connectionStr)
        {
        }

        public DbSet<Trip> Trips { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<TripInvite> Invitations { get; set; }
    }
}
