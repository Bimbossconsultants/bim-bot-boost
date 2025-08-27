from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()


class RoomDto(BaseModel):
    id: int
    name: str
    number: str
    area: float


class WallDto(BaseModel):
    id: int
    type: str
    length: float


class ExportedModel(BaseModel):
    documentTitle: str
    rooms: List[RoomDto]
    walls: List[WallDto]


class ParameterUpdate(BaseModel):
    elementId: int
    parameterName: str
    valueString: Optional[str] = None
    valueNumber: Optional[float] = None


class AiResponse(BaseModel):
    parameterUpdates: List[ParameterUpdate]


@app.get("/")
def health():
    return {"status": "ok"}


@app.post("/analyze", response_model=AiResponse)
def analyze(model: ExportedModel):
    updates: List[ParameterUpdate] = []
    for room in model.rooms:
        if room.area < 100.0:
            updates.append(
                ParameterUpdate(
                    elementId=room.id,
                    parameterName="Comments",
                    valueString="AI: Room area below threshold"
                )
            )

    return AiResponse(parameterUpdates=updates)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

