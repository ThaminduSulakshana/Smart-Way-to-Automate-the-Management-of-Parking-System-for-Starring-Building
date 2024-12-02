import cv2
import numpy as np
import pickle

rectW, rectH = 107, 48

cap = cv2.VideoCapture('carPark.mp4')

# Load the parking position list
try:
    with open('carParkPos', 'rb') as f:
        posList = pickle.load(f)
except FileNotFoundError:
    print("Error: 'carParkPos' file not found. Please check the file path.")
    exit()

frame_counter = 0

def check(imgPro, img):
    spaceCount = 0
    for parking_id, x, y in posList:
        crop = imgPro[y:y+rectH, x:x+rectW]
        count = cv2.countNonZero(crop)

        if count < 900:  # Threshold for a free space
            spaceCount += 1
            color = (0, 255, 0)
            thick = 5
        else:
            color = (0, 0, 255)
            thick = 2

        # Draw the parking slot rectangle and ID
        cv2.rectangle(img, (x, y), (x + rectW, y + rectH), color, thick)
        cv2.putText(img, f"ID: {parking_id}", (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 1)

    # Display the free space count
    cv2.rectangle(img, (45, 30), (250, 75), (180, 0, 180), -1)
    cv2.putText(img, f'Free: {spaceCount}/{len(posList)}', (50, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

while True:
    success, img = cap.read()
    if not success:
        print("Error: Unable to read frame. Check the video file.")
        break

    # Reset frame counter if at the end of the video
    if frame_counter >= cap.get(cv2.CAP_PROP_FRAME_COUNT):
        frame_counter = 0
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (3, 3), 1)
    Thre = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
    blur = cv2.medianBlur(Thre, 5)
    kernel = np.ones((3, 3), np.uint8)
    dilate = cv2.dilate(blur, kernel, iterations=1)

    # Check parking spaces
    check(dilate, img)

    # Display the result
    cv2.imshow("Image", img)

    # Exit on pressing 'q'
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
