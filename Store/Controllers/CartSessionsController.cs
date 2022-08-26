using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Context;
using Store.Entities;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartSessionsController : ControllerBase
    {
        private readonly StoreContext _context;

        public CartSessionsController(StoreContext context)
        {
            _context = context;
        }

        // GET: api/CartSessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartSession>>> GetCartSessions()
        {
            return await _context.CartSessions.ToListAsync();
        }

        // GET: api/CartSessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartSession>> GetCartSession(int id)
        {
            var cartSession = await _context.CartSessions.FindAsync(id);

            if (cartSession == null)
            {
                return NotFound();
            }

            return cartSession;
        }

        // PUT: api/CartSessions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartSession(int id, CartSession cartSession)
        {
            if (id != cartSession.Id)
            {
                return BadRequest();
            }

            _context.Entry(cartSession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartSessionExists(id))
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

        // POST: api/CartSessions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("userId")]
        public async Task<ActionResult<CartSession>> PostCartSession(int userId)
        {

            var x = await _context.CartSessions.Where(c => c.UserId == userId
                  && c.Ended_At.ToString() ==null)
                    .ToListAsync();

            if (x.Count() > 0)
            {
                return Ok("There are an Existing Cart");
            }
            else
            {

                CartSession cartSession = new CartSession()
                {
                    UserId = userId,
                    Created_At = DateTime.Now,
                };
                _context.CartSessions.Add(cartSession);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetCartSession", new { id = cartSession.Id }, cartSession);
            }
            //cartSession.UserId = userId;
            //_context.CartSessions.Add(cartSession);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("GetCartSession", new { id = cartSession.Id }, cartSession);
        }

        // DELETE: api/CartSessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartSession(int id)
        {
            var cartSession = await _context.CartSessions.FindAsync(id);
            if (cartSession == null)
            {
                return NotFound();
            }

            _context.CartSessions.Remove(cartSession);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartSessionExists(int id)
        {
            return _context.CartSessions.Any(e => e.Id == id);
        }
    }
}
