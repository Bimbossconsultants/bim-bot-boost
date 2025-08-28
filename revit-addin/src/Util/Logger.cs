using System;
using System.IO;

namespace RevitAiPlugin.Util
{
    public static class Logger
    {
        private static readonly object _lock = new object();
        public static void LogError(string message)
        {
            Write("ERROR", message);
        }

        public static void LogInfo(string message)
        {
            Write("INFO", message);
        }

        private static void Write(string level, string message)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory;
                var path = Path.Combine(dir, "RevitAiPlugin.log");
                lock (_lock)
                {
                    File.AppendAllText(path, $"{DateTime.Now:O} [{level}] {message}\n");
                }
            }
            catch { }
        }
    }
}

