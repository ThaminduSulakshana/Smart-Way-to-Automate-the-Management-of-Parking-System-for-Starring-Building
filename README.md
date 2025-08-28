# Smart Way to Automate the Management of Parking System for Starring Building


## Overview  
The **Smart Automated Parking Management System** for Starring Building leverages advanced technologies such as computer vision, augmented reality (AR), and blockchain to optimize parking operations, reduce congestion, and enhance user experience. This system automates parking slot detection, real-time navigation, vehicle identification, and rule enforcement while providing secure and seamless payment processing.  


## Research Problem

Managing parking systems in modern urban environments has become increasingly complex due to the growing number of vehicles and the need for efficient, user-friendly solutions. Traditional parking facilities often struggle with several key challenges, including inefficient use of available space, reliance on manual enforcement of parking rules, and the lack of effective guidance for drivers seeking available slots. A key issue in traditional parking systems is the manual detection and enforcement of violations, which relies on human intervention and often results in unauthorized vehicles occupying spaces. This reduces availability for legitimate users and contributes to congestion as drivers search for open slots. Additionally, outdated payment systems cause delays during entry and exit, diminishing user satisfaction.

## Solution Overview 
> To address the challenges of traditional parking systems, our System integrates advanced technologies to address the challenges of traditional parking facilities,
> - **Automated License Plate Recognition**: Identifies vehicles entering the parking lot and assigns Parking IDs to manage access efficiently.
> - **Vehicle Classification**: Classify vehicles based on their size and type to optimize parking space usage.
> - **Real-time Parking Slot Detection**: Uses cameras to monitor slot occupancy and provide real-time updates.
> - **Augmented Reality Navigation**: Guides drivers to available parking slots through AR visual guidance via mobile app.
> - **Parking Violations and Fines Management**: Automatic detection and enforcement of parking violations and automatically issues fines.
> - **Blockchain-based Payment System**: Calculates parking fees based on time parked and payments are processed securely through digital wallet integrated in the mobile app.

## Architectural Diagram
> ![System Architecture](https://github.com/user-attachments/assets/c1d4e9d7-1bb6-4ace-8479-7bd5c8aaa3ef)  

---

## Dependencies  

### Core Technologies  
- **[Python Flask](https://flask.palletsprojects.com/)**: Backend API framework.  
- **[OpenCV](https://opencv.org/)**: For parking slot detection and license plate recognition.  
- **[Unity](https://unity.com/)**: Platform for developing AR navigation applications.  
- **[AR Foundation](https://unity.com/ar-foundation)**: Framework for AR development on Unity.  
- **[React Native](https://reactnative.dev/)**: For mobile app development.    

### Machine Learning  
- **[TensorFlow](https://www.tensorflow.org/)** / **[PyTorch](https://pytorch.org/)**: Frameworks for deep learning models.  
- **[YOLOv5](https://github.com/ultralytics/yolov5)**: Object detection algorithm used to train models for detecting cars and parking slot boundaries.  

### Blockchain  
- **[Solidity](https://soliditylang.org/)**: Programming language used to develop smart contracts for automating parking fee calculations and vehicle registration on the blockchain.  
- **[Sepolia Testnet](https://sepolia.net/)**: Ethereum test network where the smart contract was deployed for testing and validation of transaction processes.  
- **[MetaMask](https://metamask.io/)**: Cryptocurrency wallet integrated with the Sepolia Testnet to interact with the blockchain for transaction processes.  
- **[Faucet](https://sepoliafaucet.com/)**: Used to mine test funds on Sepolia Testnet for conducting transactions during smart contract testing.  
- **[Ethereum](https://ethereum.org/)**: A decentralized platform used for deploying the smart contract and recording transactions on the blockchain.

### Data Dependencies  

- **[Parking Line Dataset](https://universe.roboflow.com/patterns-mq36m/parking-line-7bckr/dataset/1)**: Dataset used for training models to detect parking lines and boundaries.  
- **[Roboflow](https://roboflow.com/)**: Tool used for dataset annotation, managing parking-related datasets such as parking slot detection and vehicle classification.  
- **[COCO Dataset](https://cocodataset.org/)**: Used for general object detection, including parking-related objects like vehicles.  
- **[Open Images Dataset](https://storage.googleapis.com/openimages/web/index.html)**: Used for object detection training, which includes vehicle and parking area annotations.  
- **Custom Datasets**: Data collected and annotated for additional parking scenarios such as blocking driveways and parking in no-parking zones.  

### General Utilities  
- **[Git](https://git-scm.com/)**: Version control.  

## Repository Structure  
```plaintext  
/Smart Way to Automate the Management of Parking System for Starring Building
├── /backend/             # Backend API and ML models  
├── /ar_navigation/       # Unity project for AR-based navigation  
├── /mobile_app/          # Flutter project for mobile app  
├── /docs/                # Documentation and diagrams  
├── /tests/               # Testing and simulation scripts  
└── README.md             # Project overview  
```  
## Getting Started  

### Clone the Repository  
```bash  
git clone https://github.com/<your-username>/smart-parking-ar-navigation.git  
cd smart-parking-ar-navigation  
```  

### Install Dependencies  
#### Backend  
```bash  
pip install -r backend/requirements.txt  
```  

#### Unity AR Project  
Dependencies for AR navigation are managed via Unity Package Manager.  

### Run the System  
1. Start the backend server:  
   ```bash  
   cd backend  
   python app.py  
   ```  
2. Open `/ar_navigation/` in Unity and deploy the AR app to a compatible smartphone.  


---

This project is licensed under the [MIT License](LICENSE).
