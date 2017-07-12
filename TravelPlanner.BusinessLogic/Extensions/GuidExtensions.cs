using System;

namespace TravelPlanner.BusinessLogic.Extensions
{
    public static class GuidExtensions
    {
        public static string Encode(this Guid guid)
        {
            return EncodeGuid(guid);
        }

        public static Guid Decode(this Guid guid)
        {
            string encoded = guid.ToString();
            encoded = encoded.Replace("_", "/");
            encoded = encoded.Replace("-", "+");
            byte[] buffer = Convert.FromBase64String(encoded + "==");
            return new Guid(buffer);
        }

        private static string EncodeGuid(Guid guid)
        {
            string enc = Convert.ToBase64String(guid.ToByteArray());
            enc = enc.Replace("/", "_");
            enc = enc.Replace("+", "-");
            return enc.Substring(0, 22);
        }
    }
}
