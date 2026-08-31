using Api.Models;
using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
    public class CreateOrderRequest
    {
        [Required]
        [MaxLength(100)]
        public string? SenderCity { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string? SenderAddress { get; set; }

        [Required]
        [MaxLength(100)]
        public string? ReceiverCity { get; set; }

        [Required]
        [MaxLength(200)]
        public string? ReceiverAddress { get; set; }

        [Required]
        [Range(typeof(decimal), "0.01", "100000", ParseLimitsInInvariantCulture = true)]
        public decimal? CargoWeight { get; set; }

        [Required]
        public DateOnly? CollectionDate { get; set; }

        public static Order ToOrder(CreateOrderRequest createOrderRequest)
        {
            return new Order
            {
                SenderCity = createOrderRequest.SenderCity!,
                SenderAddress = createOrderRequest.SenderAddress!,
                ReceiverCity = createOrderRequest.ReceiverCity!,
                ReceiverAddress = createOrderRequest.ReceiverAddress!,
                CargoWeight = createOrderRequest.CargoWeight!.Value,
                CollectionDate = createOrderRequest.CollectionDate!.Value,
            };
        }
    }
}
