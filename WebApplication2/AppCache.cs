using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Parabola.Models;
using System.Runtime.Caching;
using Newtonsoft.Json;

namespace Parabola
{
    public class AppCache
    {
        public UserData GetValue(string jData)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Get(jData.ToString()) as UserData;
        }

        public bool Add(UserData userData)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            var key = "" + userData.A + "" + "" + userData.B + "" + "" + userData.C + "" + "" + userData.Step + "" + "" + userData.RangeFrom + "" + "" + userData.RangeTo + "";
            return memoryCache.Add(key.ToString(), userData, DateTime.Now.AddMinutes(10));
        }
    }
}