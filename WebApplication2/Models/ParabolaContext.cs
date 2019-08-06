using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Parabola.Models
{
    public class ParabolaContext: DbContext
    {
        public ParabolaContext():
            base("ParabolaContext")  { }

        public DbSet<Point> Points { get; set; }
        public DbSet<UserData> UserDatas { get; set; }
    }
}