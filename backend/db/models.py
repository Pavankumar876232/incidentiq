from sqlalchemy import Column, Integer, String, Text
from db.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    service = Column(String, index=True)
    issue = Column(Text)
    severity = Column(String)
    root_cause = Column(Text)
    fix = Column(Text)
    status = Column(String)