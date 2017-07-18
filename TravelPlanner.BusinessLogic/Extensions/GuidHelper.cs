using System;

namespace TravelPlanner.BusinessLogic.Extensions
{
    public static class GuidHelper
    {
        public static string ToShort(Guid guid)
        {
            return Convert.ToBase64String(guid.ToByteArray());
        }

        public static Guid ToFull(string str)
        {
            return new Guid(Convert.FromBase64String(str));
        }
    }
}
