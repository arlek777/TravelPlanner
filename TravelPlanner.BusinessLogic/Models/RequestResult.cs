using System.Collections.Generic;
using Microsoft.AspNet.Identity;

namespace TravelPlanner.BusinessLogic.Models
{
    public class RequestResult: IdentityResult
    {
        public RequestResult()
        {
        }

        public RequestResult(bool success) : base(success)
        {
        }

        public RequestResult(IEnumerable<string> errors) : base(errors)
        {
        }
    }
}
