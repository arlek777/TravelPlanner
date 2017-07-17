using System;
using System.Linq;
using System.Threading.Tasks;
using TravelPlanner.BusinessLogic.Interfaces;
using TravelPlanner.DataAccess;
using TravelPlanner.DomainModel;

namespace TravelPlanner.BusinessLogic.Services
{
    public class TripInviteService
    {
        private readonly IGenericRepository _repository;
        private readonly INotificationService _notificationService;

        public TripInviteService(IGenericRepository repository, INotificationService notificationService)
        {
            _repository = repository;
            _notificationService = notificationService;
        }

        public async Task SendInvites(Guid invitorUserId, Guid tripId, string[] phones)
        {
            var trip = await _repository.Find<Trip>(t => t.Id == tripId);
            var uniquePhones = phones.Where(phone => trip.TripInvites.All(t => t.Phone != phone)).ToList();

            uniquePhones.ForEach(phone => trip.TripInvites.Add(new TripInvite()
            {
                Phone = phone,
                Link = "new"
            }));

            await _repository.SaveChanges();

            var notifications = uniquePhones.Select(phone => new NotificationModel()
            {
                Text = "",
                To = phone
            });

            await _notificationService.SendNotifications(notifications);
        }
    }
}