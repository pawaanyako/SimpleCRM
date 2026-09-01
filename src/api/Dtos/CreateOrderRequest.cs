using Api.Models;
using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
    public class CreateOrderRequest
    {
        [Required(ErrorMessage = "Укажите город отправителя")]
        [MaxLength(100, ErrorMessage = "Слишком длинная строка")]
        public string? SenderCity { get; set; }
        
        [Required(ErrorMessage = "Укажите адрес отправителя")]
        [MaxLength(200, ErrorMessage = "Слишком длинная строка")]
        public string? SenderAddress { get; set; }

        [Required(ErrorMessage = "Укажите город получателя")]
        [MaxLength(100, ErrorMessage = "Слишком длинная строка")]
        public string? ReceiverCity { get; set; }

        [Required(ErrorMessage = "Укажите адрес получателя")]
        [MaxLength(200, ErrorMessage = "Слишком длинная строка")]
        public string? ReceiverAddress { get; set; }

        [Required(ErrorMessage = "Укажите вес груза")]
        [Range(typeof(decimal), "0.01", "100000", 
            ParseLimitsInInvariantCulture = true, 
            ErrorMessage = "Вес груза должен быть от {1} до {2} кг")]
        public decimal? CargoWeight { get; set; }

        [Required(ErrorMessage = "Укажите дату забора груза")]
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
