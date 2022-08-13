using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Entities
{
    public class FeedBack
    {
        public virtual User User { get; set; }
        [Key , Column(Order =0)]
        public int UserId { get; set; }
        public virtual Product Product { get; set; }
        [Key, Column(Order = 1)]
        public int ProductId { get; set; }
        public string Comment { get; set; }
        [Range(1,5)]
        public int Rate { get; set; }
    }
}
