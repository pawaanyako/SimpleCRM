using Api.Data;
using Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController(OrdersDbContext context) : ControllerBase
    {
        private readonly OrdersDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<OrderResponse>> Create([FromBody] CreateOrderRequest createOrderRequest)
        {
            var order = CreateOrderRequest.ToOrder(createOrderRequest);
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();  
            var orderResponse = OrderResponse.FromOrder(order);
            return CreatedAtAction(nameof(GetById), new { id = orderResponse.Id }, orderResponse);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderResponse>>> Get()
        {
            var orders = await _context.Orders.AsNoTracking().OrderByDescending(o => o.Id).ToListAsync();
            var orderResponses = orders.Select(OrderResponse.FromOrder).ToList();
            return Ok(orderResponses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderResponse>> GetById(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(OrderResponse.FromOrder(order));
        }
    }
}
