namespace intefax_test.Models
{
    public class SudokuVariant
    {
        public int Id { get; set; }
        public int?[,] Solution { get; set; }
        public int?[,] OpenedCells { get; set; }
    }
}