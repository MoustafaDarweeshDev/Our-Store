using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Store.DTOs;
using Store.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User2> _userManager;

        public AdminController(IConfiguration configuration, UserManager<User2> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }


        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new User2()
            {
                UserName = registerDTO.Username
            };
            var result = await _userManager.CreateAsync(user , registerDTO.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddClaimsAsync(user, new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier , user.Id),

            });



            return StatusCode(StatusCodes.Status201Created , "User Added alhamd lelah");
        }




        [HttpPost]
        public async Task<ActionResult> Login(LoginDTO credentials)
        {

            var requiredUser = await _userManager.FindByNameAsync(credentials.Username);

            var isAuth = await _userManager.CheckPasswordAsync(requiredUser, credentials.Password);

            if (!isAuth)
            {
                return Unauthorized();
            }

            var claims = await _userManager.GetClaimsAsync(requiredUser);

            var secretKey = _configuration.GetValue<string>("StoreKey");
            var KeyInBytes = Encoding.ASCII.GetBytes(secretKey);
            var Key = new SymmetricSecurityKey(KeyInBytes);
            var AlgorithmAndKey = new SigningCredentials(Key , SecurityAlgorithms.HmacSha256);

            var expDate = DateTime.Now.AddMinutes(15);

            var myJwt = new JwtSecurityToken(
                claims: claims,
                signingCredentials: AlgorithmAndKey,
                expires:expDate
                );


            var tokenHandler = new JwtSecurityTokenHandler();

            return Ok(new TokenDTO { 
                Token= tokenHandler.WriteToken(myJwt),
                Exp=expDate
            });
        }



    }
}
