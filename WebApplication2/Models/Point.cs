using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Parabola.Models
{
    public class Point
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PointId { get; set; }

        [ForeignKey("UserData")]
        public int ChartId { get; set; }
        public virtual UserData UserData { get; set; }

        public float PointX { get; set; }
        public float PointY { get; set; }
    }
}