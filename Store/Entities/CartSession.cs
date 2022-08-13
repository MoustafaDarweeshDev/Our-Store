using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Entities
{
    public class CartSession 
    {
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        [Key , Column(Order=1)]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public decimal? Total { get; set; }
        public CartSession()
        {
            CartItems = new HashSet<CartItem>();
        }

        public virtual ICollection<CartItem> CartItems { get; set; }

    }
}
