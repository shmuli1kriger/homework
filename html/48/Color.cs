using System;
using System.Collections.Generic;
using System.Text;

namespace HW48
{
    internal class Color
    {
        public Color()
        {
        }

        public Color(string name, int r, int g, int b)
        {
            this.Name = name;
            this.R = r;
            this.G = g;
            this.B = b;
        }
        public string Name { get; set; }
        public int R { get; set; }
        public int G { get; set; }
        public int B { get; set; }

        public string rgb()
        {
            return $"({R}, {G}, {B})";
        }
    }
}
