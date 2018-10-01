﻿using System.Web.Http;
using System.Net.Http.Headers;
using System.Web.Http.Cors;
using Newtonsoft.Json.Serialization;

namespace intefax_test
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Index",
                routeTemplate: "{id}.html",
                defaults: new { id = "index" });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SupportedMediaTypes
                .Add(new MediaTypeHeaderValue("text/html"));

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

#if DEBUG
            config.EnableCors();
#endif
        }
    }
}
