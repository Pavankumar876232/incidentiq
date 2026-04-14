def process_event(event):
    return {
        "service": event["source"],
        "issue": event["message"],
        "severity": event["severity"]
    }