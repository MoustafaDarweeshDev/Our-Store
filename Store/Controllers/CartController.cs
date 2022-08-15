using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Context;
using Store.Entities;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("Cart/{id}")]
        public async Task<ActionResult<IEnumerable<CartItem>>> getCartItems(int id)
        {
            //&& c.Ended_At == null
            CartSession userCart = await _context.CartSessions
                .Where(c => c.UserId == id)
                .OrderByDescending(c => c.Id)
                .FirstOrDefaultAsync();


            if (userCart == null)
            {
                return NoContent();
            }

            List<CartItem> cartItems = await _context.CartItems
                .Where(c => c.CartSessionId == userCart.Id)
                .Include(c=>c.Product)
                .ToListAsync();

            decimal total = 0;
            decimal? CartDiscount = 0;
            int NumberOfItems = 0;

            foreach (CartItem item in cartItems)
            {
                total += item.UnitPrice;
                NumberOfItems++;

                item.UnitPrice = item.Product.Price;
                item.Discount = item.Product.Discount;

                item._DiscountAmount = (item.UnitPrice * item.Discount) / 100;

                CartDiscount += item._DiscountAmount;


              _context.Entry(item).State = EntityState.Modified;
            }
            userCart.Total = total;
            userCart.ItemsCount = NumberOfItems;

            //await _context.CartItems.AddAsync();
            //await _context.SaveChangesAsync();
            _context.Entry(userCart).State = EntityState.Modified;

            return Ok(cartItems);
        }


        [HttpGet("AddToCart")]
        public async Task<IActionResult> AddToCart(int prodId ,int  CartId)
        {
            var product = await _context.Products.FindAsync(prodId);


            var item = new CartItem {
                CartSessionId = CartId,
                ProductId = prodId,
                Quantity = 1,
                UnitPrice = product.Price,
                Discount = product.Discount,
                 _DiscountAmount = (product.Price * product.Discount / 100)
            };
            updateTotal(item);
            _context.Entry(item).State = EntityState.Modified;

            _context.CartItems.Add(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        

        [HttpGet("Increase")]
        public async Task<ActionResult> Increase(int cartItemId)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            item.Quantity++;

            updateTotal(item);

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status202Accepted);

        }

        [HttpGet("Decrease")]
        public async Task<ActionResult> Decrease(int cartItemId)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);

            if(cartItem.Quantity <= 0)
            {
                return BadRequest();
            }
            cartItem.Quantity--;
            updateTotal(cartItem);

            _context.Entry(cartItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status202Accepted);
        }




        [HttpGet("updateTotal")]
        public void updateTotal(CartItem item)
        {

            if (item.Discount > 0)
            {
                var totalPrice = item.Quantity * item.UnitPrice;
                decimal? Discount = (item.Discount) / (100m);
                var totalDisccount = totalPrice * Discount;
                var total = totalPrice - totalDisccount;

                item.Total = total;
                item._DiscountAmount = totalDisccount;

            }
            else
            {
                item.Total = item.Quantity * item.UnitPrice;
            }
        }
    }
}
