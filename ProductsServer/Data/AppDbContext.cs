using Microsoft.EntityFrameworkCore;
using ShoppingProductsServer.Models;

namespace ShoppingProductsServer.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

  
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
}