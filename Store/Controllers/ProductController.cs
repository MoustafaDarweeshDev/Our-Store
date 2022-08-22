using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Entities;
using Store.Context;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        StoreContext db;
        public ProductController(StoreContext _db)
        {
            this.db = _db;
        }

        [HttpGet]   
        public async Task<ActionResult<IEnumerable<Product>>> Getallproducts()
        {
            return await db.Products.ToListAsync();
        }



        [HttpPost]
        public async Task<ActionResult<Product>> addProduct(Product p)
        {
            if (p == null) return BadRequest();
            if (ModelState.IsValid)
            {
                db.Products.Add(p);
                try
                {
                   await  db.SaveChangesAsync();
                    return Ok(p);
                }
                catch
                {
                    return BadRequest();
                }
            }
            else
                return BadRequest(ModelState);
        }

        [HttpDelete("{_id}")]
        public async Task<IActionResult> Deleteproduct(int _id)
        {
            Product s = db.Products.FirstOrDefault(c => c.ProductId == _id);
            if (s == null) return NotFound();
            else
            {
                await db.Products.FindAsync(_id);
                 db.Products.Remove(s);
                try
                {
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch
                {
                    return NotFound();
                }
            }
        }

        [HttpPut("{_id}")]
        public async Task<ActionResult<Product>> Editproduct(Product product, int _id)
        {
            if (_id != product.ProductId)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(_id))
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


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetproductById(int id)
        {
            Product c = await db.Products.FindAsync(id);
            if (c == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(c);
            }
        }


        //getting all product categorey
        [HttpGet("category")]
        public async Task<ActionResult<IEnumerable<Category>>> GetallproductsCategorey()
        {
            //db.NewCourses.Count() == 0
            if (!db.Products.Any())
            {
                return NoContent();
            }
            else
            {
                return  await db.Categories.ToListAsync();
            }
        }

        //getting all product categorey
        [HttpGet("brand")]
        public async Task<ActionResult<IEnumerable<Brand>>> GetallproductsBrand()
        {
            
            return await db.Brands.ToListAsync();
            
        }
        private bool ProductExists(int id)
        {
            return db.Products.Any(e => e.ProductId == id);
        }
    }
}
