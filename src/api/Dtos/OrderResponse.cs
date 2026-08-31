using Api.Models;

namespace Api.Dtos
{
    public class OrderResponse
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public string SenderCity { get; set; } = string.Empty;
        public string SenderAddress { get; set; } = string.Empty;
        public string ReceiverCity { get; set; } = string.Empty;
        public string ReceiverAddress { get; set; } = string.Empty;
        public decimal CargoWeight { get; set; }
        public DateOnly CollectionDate { get; set; }

        public static OrderResponse FromOrder(Order order)
        {
            return new OrderResponse {
                Id = order.Id,
                OrderNumber = $"ORD-{order.Id:D6}",
                SenderCity = order.SenderCity,
                SenderAddress = order.SenderAddress,
                ReceiverCity = order.ReceiverCity,
                ReceiverAddress = order.ReceiverAddress,
                CargoWeight = order.CargoWeight,
                CollectionDate = order.CollectionDate,
            };
        }
    }
}
