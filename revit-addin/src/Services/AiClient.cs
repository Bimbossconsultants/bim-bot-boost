using System;
using System.IO;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace RevitAiPlugin.Services
{
    public class AiClient
    {
        private readonly string _baseUrl;
        private readonly HttpClient _http;

        public AiClient(string baseUrl)
        {
            _baseUrl = baseUrl.TrimEnd('/');
            _http = new HttpClient();
            _http.Timeout = TimeSpan.FromSeconds(120);
        }

        public static AiClient FromConfig()
        {
            var exeDir = AppDomain.CurrentDomain.BaseDirectory;
            var cfgPath = Path.Combine(exeDir, "RevitAiPlugin.config.json");
            if (!File.Exists(cfgPath))
            {
                throw new InvalidOperationException($"Missing config at {cfgPath}");
            }
            var text = File.ReadAllText(cfgPath);
            var cfg = JsonConvert.DeserializeObject<PluginConfig>(text);
            if (cfg == null || string.IsNullOrEmpty(cfg.AiServerUrl))
            {
                throw new InvalidOperationException("Invalid config: AiServerUrl");
            }
            return new AiClient(cfg.AiServerUrl);
        }

        public AiResponse AnalyzeModel(ExportedModel model)
        {
            var json = JsonConvert.SerializeObject(model, new JsonSerializerSettings
            {
                ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(),
                Formatting = Formatting.None
            });

            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = _http.PostAsync(_baseUrl + "/analyze", content).GetAwaiter().GetResult();
            response.EnsureSuccessStatusCode();
            var respText = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            var ai = JsonConvert.DeserializeObject<AiResponse>(respText);
            if (ai == null) throw new InvalidOperationException("Empty AI response");
            return ai;
        }
    }

    public class PluginConfig
    {
        public string AiServerUrl { get; set; } = "http://localhost:8000";
    }

    public class AiResponse
    {
        public ParameterUpdate[] ParameterUpdates { get; set; } = Array.Empty<ParameterUpdate>();
    }

    public class ParameterUpdate
    {
        public int ElementId { get; set; }
        public string ParameterName { get; set; } = string.Empty;
        public string? ValueString { get; set; }
        public double? ValueNumber { get; set; }
    }
}

