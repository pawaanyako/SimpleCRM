using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class OrdersDbContext(DbContextOptions<OrdersDbContext> options) : DbContext(options)
    {
        public DbSet<Order> Orders => Set<Order>();
    }
}
