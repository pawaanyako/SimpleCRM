namespace Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string SenderCity { get; set; } = string.Empty;
        public string SenderAddress { get; set; } = string.Empty;
        public string ReceiverCity { get; set; } = string.Empty;
        public string ReceiverAddress { get; set; } = string.Empty;
        public decimal CargoWeight { get; set; }
        public DateOnly CollectionDate { get; set; }
    }
}
