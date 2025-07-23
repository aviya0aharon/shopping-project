using Microsoft.EntityFrameworkCore;
using ShoppingProductsServer.Data;
using ShoppingProductsServer.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Use Sql server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();
app.UseCors("DevCors");

// Automatically apply migrations and seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.Migrate();

    if (!context.Categories.Any())
    {
        var meat = new Category { Name = "בשר" };
        var toiletries = new Category { Name = "טואלטיקה" };
        var milkAndCheeses = new Category { Name = "חלב וגבינות" };
        var vegetablesAndFruits = new Category { Name = "ירקות ופירות" };


        context.Categories.AddRange(meat, toiletries, milkAndCheeses, vegetablesAndFruits);
        context.Products.AddRange(
            new Product { Name = "סלמון", Category = meat },
            new Product { Name = "שוקיים", Category = meat },
            new Product { Name = "נקנקיות", Category = meat },
            new Product { Name = "שמפו", Category = toiletries },
            new Product { Name = "קרם גוף", Category = toiletries },
            new Product { Name = "נייר טואלט", Category = toiletries },
            new Product { Name = "קוטג", Category = milkAndCheeses },
            new Product { Name = "חלב 3%", Category = milkAndCheeses },
            new Product { Name = "שמנת חמוצה", Category = milkAndCheeses },
            new Product { Name = "חסה", Category = vegetablesAndFruits },
            new Product { Name = "גזר", Category = vegetablesAndFruits },
            new Product { Name = "תפוח", Category = vegetablesAndFruits }
        );

        context.SaveChanges();
    }
}

//
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

app.Run();
