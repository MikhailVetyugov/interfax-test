using System.Web.Http;

namespace intefax_test
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_BeginRequest()
        {
#if DEBUG
            if (Request.HttpMethod == "OPTIONS")
            {
                Response.AddHeader("Access-Control-Allow-Headers", "*");
                Response.AddHeader("Access-Control-Allow-Methods", "GET");
                Response.End();
            }
#endif
        }

        protected void Application_EndRequest()
        {
#if DEBUG
            Response.AddHeader("Access-Control-Allow-Origin", "*");
            Response.End();
#endif
        }
    }
}
