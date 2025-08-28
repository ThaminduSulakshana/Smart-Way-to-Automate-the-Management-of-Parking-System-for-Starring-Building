import cv2
import pickle

rectW, rectH = 107, 48

# Try to load positions
try:
    with open('carParkPos', 'rb') as f:
        posList = pickle.load(f)
        # Handle older formats with only (x, y)
        if posList and isinstance(posList[0], tuple) and len(posList[0]) == 2:
            posList = [(i + 1, x, y) for i, (x, y) in enumerate(posList)]
except FileNotFoundError:
    posList = []

# Mouse callback function
def mouseClick(events, x, y, flags, params):
    if events == cv2.EVENT_LBUTTONDOWN:  # Left-click to add a parking slot
        parking_id = len(posList) + 1  # Assign a unique ID
        posList.append((parking_id, x, y))
    if events == cv2.EVENT_RBUTTONDOWN:  # Right-click to remove a parking slot
        for i, (parking_id, x1, y1) in enumerate(posList):
            if x1 < x < x1 + rectW and y1 < y < y1 + rectH:
                posList.pop(i)
                break
    # Save updated positions
    with open('carParkPos', 'wb') as f:
        pickle.dump(posList, f)

# Main loop for picking parking slots
while True:
    img = cv2.imread("img2.png")
    if img is None:
        print("Error: 'img2.png' not found. Please check the file path.")
        break

    for parking_id, x, y in posList:
        cv2.rectangle(img, (x, y), (x + rectW, y + rectH), (0, 0, 255), 2)
        cv2.putText(img, f"ID: {parking_id}", (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

    cv2.imshow("Image", img)
    cv2.setMouseCallback("Image", mouseClick)
    if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to quit
        break
