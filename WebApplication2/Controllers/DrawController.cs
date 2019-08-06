using Newtonsoft.Json;
using System;
using System.Linq;
using System.Web.Mvc;
using Parabola.Models;

namespace Parabola.Controllers
{
    public class DrawController : Controller
    {
        private ParabolaContext db = new ParabolaContext();
        private AppCache appCache = new AppCache();
        public DrawController() { }
        public DrawController(ParabolaContext parabolaContext)
        {
            db = parabolaContext;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Post(string jData)
        {
            UserData userData = new UserData();
            userData = JsonConvert.DeserializeObject<UserData>(jData);
            var keyCache = ""+userData.A +""+ ""+userData.B + "" + "" + userData.C + "" + "" + userData.Step + "" + "" + userData.RangeFrom + "" + "" + userData.RangeTo +""; 
            var resultCache = appCache.GetValue(keyCache.ToString());
            if (resultCache == null)
            {
                if (userData != null)
                {
                    float y;
                    int discriminant = (int)(Math.Sqrt(Math.Pow(userData.B, 2) - 4 * userData.A * userData.C));
                    if (discriminant >= 0)
                    {
                        for (float x = userData.RangeFrom; x <= userData.RangeTo; x += userData.Step)
                        {
                            y = (float)((userData.A * Math.Pow(x, 2)) + userData.B * x + userData.C);
                            userData.Points.Add(new Point()
                            {
                                PointX = x,
                                PointY = y
                            });

                        }

                    }

                    else
                    {
                        return Json(jData);
                    }
                    var result = userData.Points.Select(i => new { i.PointX, i.PointY }).ToList();
                    db.UserDatas.Add(userData);
                    db.SaveChanges();
                    appCache.Add(userData);
                    return Json(result);
                }
                else
                {
                    return Json(jData);
                }
            }
            else
            {
                var result = resultCache.Points.Select(i => new { i.PointX, i.PointY }).ToList();
                return Json(result);
            }
        }
    }
}