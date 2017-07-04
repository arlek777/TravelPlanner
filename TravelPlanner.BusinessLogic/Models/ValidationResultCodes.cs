namespace TravelPlanner.BusinessLogic.Models
{
    public static class ValidationResultCodes
    {
        public const string LoginWrongCredentials = "LoginWrongCredentials";
        public const string UserNameRequiredOrInvalid = "UserNameRequiredOrInvalid";

        public const string EmailRequiredOrInvalid = "EmailRequiredOrInvalid";
        public const string DuplicateEmail = "DuplicateEmail";

        public const string PasswordShort = "PasswordShort";
        public const string PasswordRequireNonLetterOrDigit = "PasswordRequireNonLetterOrDigit";
        public const string PasswordRequireDigit = "PasswordRequireDigit";
        public const string PasswordRequireLower = "PasswordRequireLower";
        public const string PasswordRequireUpper = "PasswordRequireUpper";
    }
}
