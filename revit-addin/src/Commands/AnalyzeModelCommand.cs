using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using System;
using RevitAiPlugin.Services;

namespace RevitAiPlugin.Commands
{
    [Autodesk.Revit.Attributes.Transaction(Autodesk.Revit.Attributes.TransactionMode.Manual)]
    public class AnalyzeModelCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            var uiApp = commandData.Application;
            var doc = uiApp.ActiveUIDocument?.Document;
            if (doc == null)
            {
                message = "No active document.";
                return Result.Failed;
            }

            try
            {
                var exporter = new ModelExporter();
                var model = exporter.Export(doc);

                var client = AiClient.FromConfig();
                var response = client.AnalyzeModel(model);

                var updater = new ModelUpdater();
                using (var tx = new Transaction(doc, "Apply AI Updates"))
                {
                    tx.Start();
                    updater.ApplyUpdates(doc, response);
                    tx.Commit();
                }

                TaskDialog.Show("Revit AI", "Analysis complete. Updates applied.");
                return Result.Succeeded;
            }
            catch (Exception ex)
            {
                Util.Logger.LogError("Command error: " + ex);
                message = ex.Message;
                return Result.Failed;
            }
        }
    }
}

