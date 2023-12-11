create database swiftroom;
use swiftroom;

CREATE TABLE students (
  student_id BIGINT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phone BIGINT NOT NULL,
  state VARCHAR(50) NOT NULL,
  batch INT NOT NULL,
  course VARCHAR(20) NOT NULL
);

CREATE TABLE hostel_admins (
  hostel_admin_id BIGINT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(40) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE hostel_students (
  hostel_student_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE hostel_rooms (
  room_id INT PRIMARY KEY,
  floor INT NOT NULL,
  beds INT NOT NULL,
  ac BOOLEAN NOT NULL
);

CREATE TABLE hostel_allocation (
  allocation_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL,
  room_id INT NOT NULL,
  allocation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  leave_date TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES hostel_students(student_id),
  FOREIGN KEY (room_id) REFERENCES hostel_rooms(room_id)
);

desc students;
desc hostel_admins;
desc hostel_students;
desc hostel_rooms;
desc hostel_allocation;


INSERT INTO students
values
(2111981101, "Aayush", "aayush1101@gmail.com", "9870123456", "Haryana", 2021, "CSE"),
(2111981102, "Aryan", "aryan1102@gmail.com", "9871023456", "Haryana", 2021, "CSE"),
(2111981103, "Ansh", "ansh1103@gmail.com", "9872103456", "Himhal Pradesh", 2021, "CSE"),
(2111981104, "Bhuvan", "bhuvan1104@gmail.com", "9873210456", "Rajasthan", 2021, "CSE"),
(2111981105, "Hardik", "hardik1105@gmail.com", "9874321056", "Haryana", 2021, "BCA"),
(2111981106, "Harsh", "harsh1106@gmail.com", "9875432106", "Haryana", 2021, "CSE"),
(2111981107, "Karan", "karan1107@gmail.com", "9876543210", "Himhal Pradesh", 2021, "CSE"),
(2111981108, "Manish", "manish1108@gmail.com", "9877654321", "Rajasthan", 2021, "CSE"),
(2111981109, "Manan", "manan1109@gmail.com", "9878765432", "Delhi", 2021, "CSE"),
(2111981110, "Madhav", "madhav1110@gmail.com", "9879876543", "Himhal Pradesh", 2021, "CSE"),
(2111981111, "Pranav", "pranav1111@gmail.com", "9870132456", "Haryana", 2021, "CSE"),
(2111981112, "Priyanshu", "priyanshu1112@gmail.com", "9871203456", "Punjab", 2021, "BCA"),
(2111981113, "Raghav", "raghav1113@gmail.com", "9872301456", "Punjab", 2021, "CSE"),
(2111981114, "Ritesh", "ritesh1114@gmail.com", "9873210456", "Himhal Pradesh", 2021, "CSE"),
(2111981115, "Rupit", "rupit1115@gmail.com", "9874312056", "Himhal Pradesh", 2021, "CSE"),
(2111981116, "Satvik", "satvik1116@gmail.com", "9875403216", "Haryana", 2021, "CSE"),
(2111981117, "Suryam", "suryam1117@gmail.com", "9876534120", "Rajasthan", 2021, "CSE"),
(2111981118, "Saurav", "saurav1118@gmail.com", "9877654321", "Chandigarh", 2021, "CSE"),
(2111981119, "Tanish", "tanish1119@gmail.com", "9878765432", "Punjab", 2021, "BCA"),
(2111981120, "Umesh", "umesh1120@gmail.com", "9879876543", "Haryana", 2021, "CSE"),
(2211981101, "Aman", "aman1101@gmail.com", "9871243560", "Haryana", 2022, "CSE"),
(2211981102, "Ashish", "ashish1102@gmail.com", "9872104563", "Haryana", 2021, "CSE"),
(2211981103, "Anubhav", "anubhav1103@gmail.com", "9873210546", "Rajasthan", 2021, "CSE"),
(2211981104, "Devansh", "devansh1104@gmail.com", "9874321056", "Chandigarh", 2021, "CSE"),
(2211981105, "Farhan", "farhan1115@gmail.com", "9875432106", "Delhi", 2021, "BCA"),
(2211981106, "Kaushal", "kaushal1106@gmail.com", "9876543210", "Punjab", 2021, "CSE"),
(2211981107, "Jatin", "jatin1107@gmail.com", "9877654321", "Haryana", 2021, "BCA"),
(2211981108, "Manish", "manish1108@gmail.com", "9878765432", "Haryana", 2021, "CSE"),
(2211981109, "Naman", "naman1109@gmail.com", "9879876543", "Himhal Pradesh", 2021, "CSE"),
(2211981110, "Priyanshu", "priyanshu1110@gmail.com", "9878901234", "Himhal Pradesh", 2021, "CSE"),
(2211981111, "Om", "om1111@gmail.com", "9870123456", "Haryana", 2021, "BCA"),
(2211981112, "Rohit", "rohit1112@gmail.com", "9871234560", "Himhal Pradesh", 2021, "CSE"),
(2211981113, "Rohan", "rohan1113@gmail.com", "9872345610", "Rajasthan", 2021, "CSE"),
(2211981114, "Sumit", "sumit1114@gmail.com", "9873456120", "Delhi", 2021, "CSE"),
(2211981115, "Yuvraj", "yuvraj1115@gmail.com", "9874561230", "Punjab", 2021, "BCA"),
(2311981101, "Abhay", "abhay1101@gmail.com", "9875671230", "Haryana", 2023, "CSE"),
(2311981102, "Antriksh", "antriksh1101@gmail.com", "9876781230", "Chandigarh", 2023, "CSE"),
(2311981103, "Ayush", "ayush1101@gmail.com", "9877890123", "Haryana", 2023, "CSE"),
(2311981104, "Ayush", "ayush1101@gmail.com", "9878901234", "Himhal Pradesh", 2023, "BCA"),
(2311981105, "Dev", "dev1101@gmail.com", "9879012345", "Himhal Pradesh", 2023, "CSE"),
(2311981106, "Gagan", "gagan1101@gmail.com", "9871234567", "Chandigarh", 2023, "CSE"),
(2311981107, "Kashish", "kashish1101@gmail.com", "9872345678", "Punjab", 2023, "CSE"),
(2311981108, "Harshit", "harshit1101@gmail.com", "9873456789", "Haryana", 2023, "CSE"),
(2311981109, "Manish", "manish1101@gmail.com", "9874567890", "Rajasthan", 2023, "BCA"),
(2311981110, "Priyanshu", "priyanshu1101@gmail.com", "9875678901", "Punjab", 2023, "CSE"),
(2311981111, "Praveen", "praveen1101@gmail.com", "9876789012", "Himachal Pradesh", 2023, "CSE"),
(2311981112, "Ravi", "ravi1101@gmail.com", "9877890123", "Haryana", 2023, "BCA"),
(2311981113, "Shivam", "shivam1101@gmail.com", "9878901234", "Punjab", 2023, "CSE"),
(2311981114, "Vansh", "vansh1101@gmail.com", "9879012345", "Rajasthan", 2023, "CSE"),
(2311981115, "Zahir", "zahir1101@gmail.com", "9670123456", "Chandigarh", 2023, "BCA")
;


INSERT INTO hostel_rooms
values
(101, 1, 1, 0),
(102, 1, 1, 0),
(103, 1, 2, 0),
(104, 1, 2, 0),
(105, 1, 3, 0),
(106, 1, 3, 0),
(107, 1, 3, 0),
(108, 1, 4, 0),
(109, 1, 4, 0),
(110, 1, 4, 0),
(111, 1, 1, 1),
(112, 1, 1, 1),
(113, 1, 2, 1),
(114, 1, 2, 1),
(115, 1, 3, 1),
(116, 1, 3, 1),
(117, 1, 3, 1),
(118, 1, 4, 1),
(119, 1, 4, 1),
(120, 1, 4, 1)
;

INSERT INTO hostel_rooms
values
(201, 2, 1, 0),
(202, 2, 1, 0),
(203, 2, 2, 0),
(204, 2, 2, 0),
(205, 2, 3, 0),
(206, 2, 3, 0),
(207, 2, 3, 0),
(208, 2, 4, 0),
(209, 2, 4, 0),
(210, 2, 4, 0),
(211, 2, 1, 1),
(212, 2, 1, 1),
(213, 2, 2, 1),
(214, 2, 2, 1),
(215, 2, 3, 1),
(216, 2, 3, 1),
(217, 2, 3, 1),
(218, 2, 4, 1),
(219, 2, 4, 1),
(220, 2, 4, 1)
;

INSERT INTO hostel_rooms
values
(301, 3, 1, 0),
(302, 3, 1, 0),
(303, 3, 2, 0),
(304, 3, 2, 0),
(305, 3, 3, 0),
(306, 3, 3, 0),
(307, 3, 3, 0),
(308, 3, 4, 0),
(309, 3, 4, 0),
(310, 3, 4, 0),
(311, 3, 1, 1),
(312, 3, 1, 1),
(313, 3, 2, 1),
(314, 3, 2, 1),
(315, 3, 3, 1),
(316, 3, 3, 1),
(317, 3, 3, 1),
(318, 3, 4, 1),
(319, 3, 4, 1),
(320, 3, 4, 1)
;

INSERT INTO hostel_rooms
values
(401, 4, 1, 0),
(402, 4, 1, 0),
(403, 4, 2, 0),
(404, 4, 2, 0),
(405, 4, 3, 0),
(406, 4, 3, 0),
(407, 4, 3, 0),
(408, 4, 4, 0),
(409, 4, 4, 0),
(410, 4, 4, 0),
(411, 4, 1, 1),
(412, 4, 1, 1),
(413, 4, 2, 1),
(414, 4, 2, 1),
(415, 4, 3, 1),
(416, 4, 3, 1),
(417, 4, 3, 1),
(418, 4, 4, 1),
(419, 4, 4, 1),
(420, 4, 4, 1)
;

select * from students;
select * from hostel_admins;
select * from hostel_students;
select * from hostel_rooms;
select * from hostel_allocation;

show tables;