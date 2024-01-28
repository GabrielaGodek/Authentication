-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sty 28, 2024 at 11:06 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `type`) VALUES
(49, 'admin', '$2b$10$wMXviCW8MrYv.NUyj.BGRuObzEzfomFJdWvBibMUfi32T12AekQlC', 'admin@admin.com', 'admin'),
(50, 'cate', '$2b$10$MBCcow3PrQ7eeJ2Mo0OKDOcDPOA8fDynwxcGYrWywdzJR8CUmxwnu', 'cate@cate.com', 'user'),
(53, 'mike', '$2b$10$Hn6t/zGJA0EPcb6nczexiutx.wfUt2JD/1twnGy4uipGlDDEunSkW', 'mike@mike.com', 'user'),
(54, 'ellen', '$2b$10$Hn6t/zGJA0EPcb6nczexiutx.wfUt2JD/1twnGy4uipGlDDEunSkW', 'ellen@ellen.com', 'user');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
