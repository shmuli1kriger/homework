namespace HW48
{
    internal class Shirt
    {
        public Shirt()
        {
        }

        public Shirt(Color color, Pattern pattern)
        {
            this.color = color;
            this.pattern = pattern;
        }

        public Color color { get; set; }
        public Pattern pattern { get; set; }

        static void Main(string[] args)
        {
            List<Color> colors = new List<Color>()
            {
            new Color("blue", 0, 0, 255),
            new Color("green", 0, 255, 0),
            new Color("red", 255, 0, 0),
            };
            List<Pattern> patterns = new List<Pattern>()
            {
                new Pattern() { name = "striped" },
                new Pattern() { name = "checkered" },
                new Pattern() { name = "plain" }
            };
            for (int i = 0; i < colors.Count; i++)
            {
                for (int j = 0; j < patterns.Count; j++)
                {
                    Shirt shirt = new Shirt(colors[i], patterns[j]);
                    Console.WriteLine($"{shirt.color.Name}: {shirt.pattern.name}");
                }
            }

        }
    }
}
