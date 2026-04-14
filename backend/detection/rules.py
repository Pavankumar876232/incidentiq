def detect_anomaly(event):
    keywords = ["error", "fail", "crash", "timeout"]

    for word in keywords:
        if word in event["issue"].lower():
            return True

    return False