using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Parabola.Models
{
    public class UserData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserDataId { get; set; }

        public int RangeFrom { get; set; }
        public int RangeTo { get; set; }
        public float Step { get; set; }
        public int A { get; set; }
        public int B { get; set; }
        public int C { get; set; }

        public virtual List<Point> Points { get; set; } = new List<Point>();
    }
}