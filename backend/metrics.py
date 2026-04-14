from prometheus_client import Counter

incident_counter = Counter(
    "incident_count",
    "Total number of incidents"
)