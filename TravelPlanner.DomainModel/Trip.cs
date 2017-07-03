using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelPlanner.DomainModel
{
    public class Trip
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid CreatorId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description  { get; set; }

        public virtual Chat Chat { get; set; }
        public virtual ICollection<Invitation> Invitations { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
