using Autodesk.Revit.UI;
using Autodesk.Revit.ApplicationServices;
using Autodesk.Revit.DB.Events;
using System;
using System.Reflection;

namespace RevitAiPlugin
{
    public class App : IExternalApplication
    {
        public Result OnStartup(UIControlledApplication application)
        {
            try
            {
                var tabName = "AI Tools";
                try { application.CreateRibbonTab(tabName); } catch { }

                var panel = application.CreateRibbonPanel(tabName, "Analysis");

                var asm = Assembly.GetExecutingAssembly().Location;
                var btnData = new PushButtonData(
                    "AnalyzeModelButton",
                    "Analyze\nModel",
                    asm,
                    "RevitAiPlugin.Commands.AnalyzeModelCommand");

                btnData.ToolTip = "Export model data, send to AI, and apply updates.";
                panel.AddItem(btnData);
            }
            catch (Exception ex)
            {
                Util.Logger.LogError("Startup error: " + ex);
                return Result.Failed;
            }

            return Result.Succeeded;
        }

        public Result OnShutdown(UIControlledApplication application)
        {
            return Result.Succeeded;
        }
    }
}

