// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ParkingFeeSystem {
    struct UserInfo {
        string userName;
        address walletAddress;
        bool registered; // To track if the user is registered
    }

    struct VehicleInfo {
        string vehicleNumber;
        uint256 parkingHours; // Parking hours for this vehicle
        uint256 totalFee;     // Total calculated fee for parking
        uint256 totalFine;    // Total fines incurred for parking violations
        bool feePaid;         // Indicates if the fee has been paid
    }

    mapping(address => UserInfo) public users;            // Mapping to store user information
    mapping(address => VehicleInfo[]) public userVehicles; // Mapping to store user's multiple vehicles
    mapping(address => uint256) public balances;          // Mapping to store user balances for parking fees
    address public owner;                                 // Contract owner (admin)
    uint256 public feeRatePerHour;                        // Fee rate per hour in Wei
    uint256 public fineAmount = 5 * 10**18;               // Fine amount (5 dollars in Wei)

    event UserAndVehicleRegistered(address indexed user, string userName, string vehicleNumber);
    event ParkingHoursSet(address indexed user, string vehicleNumber, uint256 parkingHours, uint256 fee);
    event FineAdded(address indexed user, string vehicleNumber, uint256 fineAmount);
    event FeePaid(address indexed user, string vehicleNumber, uint256 amount);
    event BalanceDeposited(address indexed user, uint256 amount);
    event BalanceWithdrawn(address indexed user, uint256 amount);
    event OwnerWithdrawn(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyRegisteredUser() {
        require(users[msg.sender].registered, "User not registered");
        _;
    }

    constructor(uint256 _feeRatePerHour) {
        owner = msg.sender; // Set the deployer as the owner
        feeRatePerHour = _feeRatePerHour; // Initialize fee rate in Wei
    }

    /**
     * @notice Register a new user and their vehicle details (Owner-only)
     * @param _userAddress The address of the user
     * @param _userName The user's name
     * @param _vehicleNumber The vehicle number to register
     */
    function registerUserAndVehicle(
        address _userAddress,
        string memory _userName,
        string memory _vehicleNumber
    ) public onlyOwner {
        require(_userAddress != address(0), "Invalid user address");
        require(bytes(_userName).length > 0, "User name cannot be empty");
        require(bytes(_vehicleNumber).length > 0, "Vehicle number cannot be empty");
        require(!users[_userAddress].registered, "User already registered");

        // Register the user
        users[_userAddress] = UserInfo({
            userName: _userName,
            walletAddress: _userAddress,
            registered: true
        });

        // Add the vehicle
        userVehicles[_userAddress].push(
            VehicleInfo({
                vehicleNumber: _vehicleNumber,
                parkingHours: 0,
                totalFee: 0,
                totalFine: 0,
                feePaid: false
            })
        );

        emit UserAndVehicleRegistered(_userAddress, _userName, _vehicleNumber);
    }

    /**
     * @notice Add a new vehicle for a registered user (Owner-only)
     * @param _userAddress The address of the vehicle owner
     * @param _vehicleNumber The vehicle number to add
     */
    function addVehicle(address _userAddress, string memory _vehicleNumber) public onlyOwner {
        require(users[_userAddress].registered, "User not registered");
        require(bytes(_vehicleNumber).length > 0, "Vehicle number cannot be empty");

        // Check if the vehicle number is already registered for this user
        VehicleInfo[] storage vehicles = userVehicles[_userAddress];
        for (uint256 i = 0; i < vehicles.length; i++) {
            require(
                keccak256(bytes(vehicles[i].vehicleNumber)) != keccak256(bytes(_vehicleNumber)),
                "Vehicle already registered"
            );
        }

        // Add the new vehicle
        vehicles.push(
            VehicleInfo({
                vehicleNumber: _vehicleNumber,
                parkingHours: 0,
                totalFee: 0,
                totalFine: 0,
                feePaid: false
            })
        );

        emit UserAndVehicleRegistered(_userAddress, users[_userAddress].userName, _vehicleNumber);
    }

    /**
     * @notice Assign parking hours and calculate fees for a user's vehicle (Owner-only)
     * @param _userAddress The user's address
     * @param _vehicleNumber The vehicle number
     * @param _parkingHours The number of hours the vehicle will be parked
     */
    function assignParkingHours(
        address _userAddress,
        string memory _vehicleNumber,
        uint256 _parkingHours
    ) public onlyOwner {
        require(users[_userAddress].registered, "User not registered");
        require(_parkingHours > 0, "Parking hours must be greater than zero");

        // Find the vehicle by its number
        VehicleInfo[] storage vehicles = userVehicles[_userAddress];
        bool vehicleFound = false;

        for (uint256 i = 0; i < vehicles.length; i++) {
            if (keccak256(bytes(vehicles[i].vehicleNumber)) == keccak256(bytes(_vehicleNumber))) {
                vehicles[i].parkingHours = _parkingHours;
                vehicles[i].totalFee = _parkingHours * feeRatePerHour; // Calculate the total fee
                vehicles[i].feePaid = false;
                vehicleFound = true;

                emit ParkingHoursSet(_userAddress, _vehicleNumber, _parkingHours, vehicles[i].totalFee);
                break;
            }
        }

        require(vehicleFound, "Vehicle not found");
    }

    /**
     * @notice Add a parking violation fine for a user's vehicle (Owner-only)
     * @param _userAddress The user's address
     * @param _vehicleNumber The vehicle number
     */
    function addFine(address _userAddress, string memory _vehicleNumber) public onlyOwner {
        require(users[_userAddress].registered, "User not registered");

        // Find the vehicle by its number
        VehicleInfo[] storage vehicles = userVehicles[_userAddress];
        bool vehicleFound = false;

        for (uint256 i = 0; i < vehicles.length; i++) {
            if (keccak256(bytes(vehicles[i].vehicleNumber)) == keccak256(bytes(_vehicleNumber))) {
                vehicles[i].totalFine += fineAmount; // Add fine to the vehicle
                vehicleFound = true;

                emit FineAdded(_userAddress, _vehicleNumber, fineAmount);
                break;
            }
        }

        require(vehicleFound, "Vehicle not found");
    }

    /**
     * @notice Pay the total parking fee and fines for a specific vehicle
     * @param _vehicleNumber The vehicle number
     */
    function payFee(string memory _vehicleNumber) public onlyRegisteredUser {
        VehicleInfo[] storage vehicles = userVehicles[msg.sender];
        bool vehicleFound = false;

        for (uint256 i = 0; i < vehicles.length; i++) {
            if (keccak256(bytes(vehicles[i].vehicleNumber)) == keccak256(bytes(_vehicleNumber))) {
                uint256 totalAmount = vehicles[i].totalFee + vehicles[i].totalFine;
                require(!vehicles[i].feePaid, "Fee already paid");
                require(totalAmount > 0, "No dues to pay");
                require(balances[msg.sender] >= totalAmount, "Insufficient balance to pay the fee");

                // Deduct the total amount from the user's balance
                balances[msg.sender] -= totalAmount;

                // Mark the fee as paid and reset fines
                vehicles[i].feePaid = true;
                vehicles[i].totalFee = 0;
                vehicles[i].totalFine = 0;

                vehicleFound = true;

                emit FeePaid(msg.sender, _vehicleNumber, totalAmount);
                break;
            }
        }

        require(vehicleFound, "Vehicle not found");
    }

    /**
     * @notice Deposit funds into the user's balance
     */
    function depositBalance() public payable onlyRegisteredUser {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += msg.value;
        emit BalanceDeposited(msg.sender, msg.value);
    }
}