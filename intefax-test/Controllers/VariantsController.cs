using System.Collections.Generic;
using System.Web.Http;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using intefax_test.Models;

namespace intefax_test.Controllers
{
    public class VariantsController : ApiController
    {
        [HttpGet]
        public SudokuVariant Get(int id)
        {
            var variants = GetVariants();
            return variants.SingleOrDefault(variant => variant.Id == id);
        }

        [HttpGet]
        [Route("api/variants/ids")]
        public IEnumerable<int> GetVariantIds()
        {
            var variants = GetVariants();
            return variants.Select(variant => variant.Id);
        }

        private IEnumerable<SudokuVariant> GetVariants()
        {
            var variantsPath = HttpContext.Current.Server.MapPath(@"/App_Data/variants.json");
            var json = File.ReadAllText(variantsPath);
            return JsonConvert.DeserializeObject<IEnumerable<SudokuVariant>>(json);
        }
    }
}
