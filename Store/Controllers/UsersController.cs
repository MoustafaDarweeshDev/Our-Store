using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Context;
using Store.Entities;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  
    public class UsersController : ControllerBase
    {
        private readonly StoreContext _context;

        public UsersController(StoreContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize(AuthenticationSchemes = "StoreAdmin" )]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;
            _context.Entry(user.Address).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IEnumerable<CartItem>>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        [HttpGet("out")]
        public async Task<ActionResult<IEnumerable<CartItem>>> getCartItems(int id)
        {
            //&& c.Ended_At == null
            CartSession userCart =await _context.CartSessions
                .Where(c => c.UserId == id )
                .OrderByDescending(c => c.Id)
                .FirstOrDefaultAsync();
            

            if (userCart == null)
            {
                return NoContent();
            }

            List<CartItem> cartItems = await _context.CartItems
                .Where(c=> c.CartSessionId == userCart.Id).ToListAsync();

            decimal total = 0;
            decimal? CartDiscount = 0;

            foreach (CartItem item in cartItems)
            {
                total+= item.UnitPrice;


                item.UnitPrice = item.Product.Price;
                item.Discount = item.Product.Discount;

                item._DiscountAmount = (item.UnitPrice * item.Discount) / 100;

                CartDiscount += item._DiscountAmount;
            }
            userCart.Total = total;


            return cartItems;
        }

    }
}
