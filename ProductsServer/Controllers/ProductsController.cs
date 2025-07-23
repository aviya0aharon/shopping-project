using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingProductsServer.Data;
using ShoppingProductsServer.Models;

namespace ShoppingProductsServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProductsWithCategory()
    {
        var products = await _context.Products
            .Include(p => p.Category)
            .Select(p => new {
                p.Id,
                p.Name,
                Category =
                    p.Category.Name,
                CategoryId =
                    p.Category.Id
            })
            .ToListAsync();

        return Ok(products);
    }
}
