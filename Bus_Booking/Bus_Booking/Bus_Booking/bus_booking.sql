-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2024 at 10:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bus_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `BookingID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `BusID` int(11) DEFAULT NULL,
  `BookingDate` date DEFAULT NULL,
  `TotalFare` decimal(10,2) DEFAULT NULL,
  `SelectedSeats` text DEFAULT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bus`
--

CREATE TABLE `bus` (
  `BusID` int(11) NOT NULL,
  `DepartureCity` varchar(100) DEFAULT NULL,
  `ArrivalCity` varchar(100) DEFAULT NULL,
  `DepartureTime` varchar(50) DEFAULT NULL,
  `ArrivalTime` varchar(50) DEFAULT NULL,
  `DateOfTravel` date DEFAULT NULL,
  `DateOfArrival` date DEFAULT NULL,
  `Fare` decimal(10,2) DEFAULT NULL,
  `seatsLeft` int(11) DEFAULT NULL,
  `BusName` varchar(100) DEFAULT NULL,
  `BusImage` varchar(255) DEFAULT NULL,
  `SelectedSeats` text DEFAULT NULL,
  `NumRows` int(11) DEFAULT NULL,
  `NumColumns` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus`
--

INSERT INTO `bus` (`BusID`, `DepartureCity`, `ArrivalCity`, `DepartureTime`, `ArrivalTime`, `DateOfTravel`, `DateOfArrival`, `Fare`, `seatsLeft`, `BusName`, `BusImage`, `SelectedSeats`, `NumRows`, `NumColumns`, `created_at`) VALUES
(21, 'Mumbai', 'Ahmedabad', '22:00', '08:00', '2024-03-23', '2024-03-24', 900.00, 60, 'Shreeji', '1711014405009-busimage.jpg', NULL, 10, 6, '2024-03-21 15:16:45'),
(22, 'Delhi', 'Mumbai', '22:00', '21:00', '2024-09-30', '2024-10-01', 1200.00, 40, 'Tcs', '1711014493220-busimage.jpg', NULL, 9, 5, '2024-03-21 15:18:13');

--
-- Triggers `bus`
--
DELIMITER $$
CREATE TRIGGER `update_seatsLeft_trigger` BEFORE INSERT ON `bus` FOR EACH ROW BEGIN
    SET NEW.seatsLeft = NEW.NumRows * NEW.NumColumns;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`Name`, `Email`, `Message`) VALUES
('dcbskdjc', 'jadbckjsdbcjsb', 'sdc jsdcbksjdcbdksjcnb'),
('', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `PaymentID` int(11) NOT NULL,
  `BookingID` int(11) DEFAULT NULL,
  `RazorpayTransactionID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `FirstName`, `LastName`, `Email`, `Phone`, `Gender`, `Password`, `isAdmin`) VALUES
(4, 'Shaival', 'Doshi', 'admin@admin.com', '1234567890', 'male', '1234', 1),
(5, 'Shaival', 'Doshi', 'customer@customer.com', '1111111111', 'male', '1234', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `BusID` (`BusID`);

--
-- Indexes for table `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`BusID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `BookingID` (`BookingID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `bus`
--
ALTER TABLE `bus`
  MODIFY `BusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`BusID`) REFERENCES `bus` (`BusID`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
