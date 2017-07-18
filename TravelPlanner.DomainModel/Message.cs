using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelPlanner.DomainModel
{
    public class Message
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid ChatId { get; set; }
        public Guid UserId { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public DateTime SentDt { get; set; }
        public Chat Chat { get; set; }
        public User User { get; set; }
    }
}