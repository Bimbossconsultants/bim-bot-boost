using Autodesk.Revit.DB;
using System.Collections.Generic;
using System.Linq;

namespace RevitAiPlugin.Services
{
    public class ModelExporter
    {
        public ExportedModel Export(Document doc)
        {
            var rooms = new FilteredElementCollector(doc)
                .OfCategory(BuiltInCategory.OST_Rooms)
                .WhereElementIsNotElementType()
                .Cast<Element>()
                .Select(e => new RoomDto
                {
                    Id = e.Id.IntegerValue,
                    Name = e.Name,
                    Number = e.LookupParameter("Number")?.AsString() ?? string.Empty,
                    Area = e.get_Parameter(BuiltInParameter.ROOM_AREA)?.AsDouble() ?? 0.0
                })
                .ToList();

            var walls = new FilteredElementCollector(doc)
                .OfClass(typeof(Wall))
                .Cast<Wall>()
                .Select(w => new WallDto
                {
                    Id = w.Id.IntegerValue,
                    Type = doc.GetElement(w.GetTypeId())?.Name ?? string.Empty,
                    Length = w.get_Parameter(BuiltInParameter.CURVE_ELEM_LENGTH)?.AsDouble() ?? 0.0,
                })
                .ToList();

            return new ExportedModel
            {
                DocumentTitle = doc.Title,
                Rooms = rooms,
                Walls = walls
            };
        }
    }

    public class ExportedModel
    {
        public string DocumentTitle { get; set; } = string.Empty;
        public List<RoomDto> Rooms { get; set; } = new List<RoomDto>();
        public List<WallDto> Walls { get; set; } = new List<WallDto>();
    }

    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Number { get; set; } = string.Empty;
        public double Area { get; set; }
    }

    public class WallDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public double Length { get; set; }
    }
}

