using Autodesk.Revit.DB;
using System;

namespace RevitAiPlugin.Services
{
    public class ModelUpdater
    {
        public void ApplyUpdates(Document doc, AiResponse response)
        {
            foreach (var upd in response.ParameterUpdates)
            {
                try
                {
                    var element = doc.GetElement(new ElementId(upd.ElementId));
                    if (element == null) continue;
                    var param = element.LookupParameter(upd.ParameterName);
                    if (param == null || param.IsReadOnly) continue;

                    if (upd.ValueString != null)
                    {
                        param.Set(upd.ValueString);
                    }
                    else if (upd.ValueNumber.HasValue)
                    {
                        if (param.Definition.ParameterType == ParameterType.Length)
                        {
                            param.Set(UnitUtils.ConvertToInternalUnits(upd.ValueNumber.Value, UnitTypeId.Millimeters));
                        }
                        else
                        {
                            param.Set(upd.ValueNumber.Value);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Util.Logger.LogError($"Failed to update element {upd.ElementId}: {ex.Message}");
                }
            }
        }
    }
}

