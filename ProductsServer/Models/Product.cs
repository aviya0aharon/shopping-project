namespace ShoppingProductsServer.Models;

public class Product
{
	public int Id { get; set; }
	public string Name { get; set; } = string.Empty;
	public int CategoryID { get; set; }
    public required Category Category { get; set; }
}