using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Entities
{
    public class User
    {
        [Key]
        public int UserId {get;set;}
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime BirthDay { get; set; }
        public int? Age { get { return DateTime.Now.Year - BirthDay.Year; }}
        [Required,Range(0, 1)]
        public int Gender { get; set; }
        [Required,EmailAddress]
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [NotMapped , Required , Compare(nameof(Password))]
        public string CPassword { get; set; }
        public virtual Address Address { get; set; }
        public int? Phone { get; set; }

        public virtual CartSession CartSession { get; set; }
    }
}
