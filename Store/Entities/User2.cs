using Microsoft.AspNetCore.Identity;

namespace Store.Entities
{
    public class User2: IdentityUser
    {
        public string? Department { get; set; }
    }
}
