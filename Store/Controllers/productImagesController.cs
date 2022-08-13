using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.Context;
using Store.Entities;

namespace testFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class productImagesController : ControllerBase
    {

        StoreContext db;
        public productImagesController(StoreContext _db)
        {
            this.db = _db;
        }
        [HttpPost]
        public IActionResult uploadProductImage(productImages pm)
        {
            if (pm == null) return BadRequest();
            if (ModelState.IsValid)
            {

                db.ProductImages.Add(pm);
                try
                {
                    db.SaveChanges();
                    return Created("seccess", db.ProductImages.ToList());
                }
                catch
                {
                    return BadRequest();
                }
            }
            else
                return BadRequest();

        }
    }
}
