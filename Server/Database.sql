create database SwiftRoom;
use SwiftRoom;


create table hostel(
	room_id int primary key,
	floor_no int check(floor_no in (1,2,3,4)),
    num_bed int,
    available_bed int,
    _room boolean
);



INSERT INTO hostel
values
(101,1,4,4,1),(102,1,4,4,1),(103,1,2,2,1),(104,1,2,2,1),(105,1,3,3,1),(106,1,3,3,1),
(107,1,4,4,0),(108,1,4,4,1),(109,1,4,4,0),(110,1,4,4,0),(111,1,4,4,0),(112,1,2,2,0),(113,1,2,2,0),
(114,1,3,3,0),(115,1,3,3,0),(116,1,4,4,1),(117,1,4,4,0),(118,1,2,2,1),(119,1,3,3,0),(120,1,2,2,1)
;

INSERT INTO hostel
values
(201,2,4,4,1),(202,2,4,4,1),(203,2,2,2,1),(204,2,2,2,1),(205,2,3,3,1),(206,2,3,3,1),
(207,2,4,4,0),(208,1,4,4,1),(209,2,4,4,0),(210,2,4,4,0),(211,2,4,4,0),(212,2,2,2,0),(213,2,2,2,0),
(214,2,3,3,0),(215,2,3,3,0),(216,2,4,4,1),(217,2,4,4,0),(218,2,2,2,1),(219,2,3,3,0),(220,2,2,2,1)
;

INSERT INTO hostel
values
(301,3,4,4,1),(302,3,4,4,1),(303,3,2,2,1),(304,3,2,2,1),(305,3,3,3,1),(306,3,3,3,1),
(307,3,4,4,0),(308,3,4,4,1),(309,3,4,4,0),(310,3,4,4,0),(311,3,4,4,0),(312,3,2,2,0),(313,3,2,2,0),
(314,3,3,3,0),(315,3,3,3,0),(316,3,4,4,1),(317,3,4,4,0),(318,3,2,2,1),(319,3,3,3,0),(320,3,2,2,1)
;

INSERT INTO hostel
values
(401,4,4,4,1),(402,4,4,4,1),(403,4,2,2,1),(404,4,2,2,1),(405,4,3,3,1),(406,4,3,3,1),
(407,4,4,4,0),(408,4,4,4,1),(409,4,4,4,0),(410,4,4,4,0),(411,4,4,4,0),(412,4,2,2,0),(413,4,2,2,0),
(414,4,3,3,0),(415,4,3,3,0),(416,4,4,4,1),(417,4,4,4,0),(418,4,2,2,1),(419,4,3,3,0),(420,4,2,2,1)
;
select * from hostel;


create table student(
	id bigint primary key,
    name varchar(20),
    city varchar(20),
    state varchar(20),
    batch int,
    course varchar(20),
    phone_no bigint,
    email varchar(40),
    hosteller boolean,
    room int,
    foreign key (room) references hostel(room_id)
);


INSERT INTO student
values
(2111981101,"Aayush","Kalka","Haryana","2021","CSE","9870123456","aayush1101@gmail.com",false,null),
(2111981102,"Aryan","Manali","Haryana","2021","CSE","9871023456","aryan1102@gmail.com",false,null),
(2111981103,"Ansh","Palampur","Himhal Pradesh","2021","CSE","9872103456","ansh1103@gmail.com",false,null),
(2111981104,"Bhuvan","Jaipur","Rajasthan","2021","CSE","9873210456","bhuvan1104@gmail.com",false,null),
(2111981105,"Hardik","Karnal","Haryana","2021","BCA","9874321056","hardik1105@gmail.com",false,null),
(2111981106,"Harsh","Ambala","Haryana","2021","CSE","9875432106","harsh1106@gmail.com",false,null),
(2111981107,"Karan","Kangra","Himhal Pradesh","2021","CSE","9876543210","karan1107@gmail.com",false,null),
(2111981108,"Manish","Ganganagar","Rajasthan","2021","CSE","9877654321","manish1108@gmail.com",false,null),
(2111981109,"Manan","Delhi","Delhi","2021","CSE","9878765432","manan1109@gmail.com",false,null),
(2111981110,"Madhav","Baddi","Himhal Pradesh","2021","CSE","9879876543","madhav1110@gmail.com",false,null),
(2111981111,"Pranav","Karnal","Haryana","2021","CSE","9870132456","pranav1111@gmail.com",false,null),
(2111981112,"Priyanshu","Bathinda","Punjab","2021","BCA","9871203456","priyanshu1112@gmail.com",false,null),
(2111981113,"Raghav","Jalandar","Punjab","2021","CSE","9872301456","raghav1113@gmail.com",false,null),
(2111981114,"Ritesh","Palampur","Himhal Pradesh","2021","CSE","9873210456","ritesh1114@gmail.com",false,null),
(2111981115,"Rupit","Shimla","Himhal Pradesh","2021","CSE","9874312056","rupit1115@gmail.com",false,null),
(2111981116,"Satvik","Kalka","Haryana","2021","CSE","9875403216","satvik1116@gmail.com",false,null),
(2111981117,"Suryam","Ajmer","Rajasthan","2021","CSE","9876534120","suryam1117@gmail.com",false,null),
(2111981118,"Saurav","Chandigarh","Chandigarh","2021","CSE","9877654321","saurav1118@gmail.com",false,null),
(2111981119,"Tanish","Mohali","Punjab","2021","BCA","9878765432","tanish1119@gmail.com",false,null),
(2111981120,"Umesh","Rewari","Haryana","2021","CSE","9879876543","umesh1120@gmail.com",false,null),
(2211981101,"Aman","Kalka","Haryana","2022","CSE","9871243560","aman1101@gmail.com",false,null),
(2211981102,"Ashish","Ambala","Haryana","2021","CSE","9872104563","ashish1102@gmail.com",false,null),
(2211981103,"Anubhav","Jaipur","Rajasthan","2021","CSE","9873210546","anubhav1103@gmail.com",false,null),
(2211981104,"Devansh","Chandigarh","Chandigarh","2021","CSE","9874321056","devansh1104@gmail.com",false,null),
(2211981105,"Farhan","Delhi","Delhi","2021","BCA","9875432106","farhan1115@gmail.com",false,null),
(2211981106,"Kaushal","Amritsar","Punjab","2021","CSE","9876543210","kaushal1106@gmail.com",false,null),
(2211981107,"Jatin","Kalka","Haryana","2021","BCA","9877654321","jatin1107@gmail.com",false,null),
(2211981108,"Manish","Karnal","Haryana","2021","CSE","9878765432","manish1108@gmail.com",false,null),
(2211981109,"Naman","Una","Himhal Pradesh","2021","CSE","9879876543","naman1109@gmail.com",false,null),
(2211981110,"Priyanshu","Shimal","Himhal Pradesh","2021","CSE","9878901234","priyanshu1110@gmail.com",false,null),
(2211981111,"Om","Kalka","Haryana","2021","BCA","9870123456","om1111@gmail.com",false,null),
(2211981112,"Rohit","Shimla","Himhal Pradesh","2021","CSE","9871234560","rohit1112@gmail.com",false,null),
(2211981113,"Rohan","Udaipur","Rajasthan","2021","CSE","9872345610","rohan1113@gmail.com",false,null),
(2211981114,"Sumit","Delhi","Delhi","2021","CSE","9873456120","sumit1114@gmail.com",false,null),
(2211981115,"Yuvraj","Jalandar","Punjab","2021","BCA","9874561230","yuvraj1115@gmail.com",false,null),
(2311981101,"Abhay","Karnal","Haryana","2023","CSE","9875671230","abhay1101@gmail.com",false,null),
(2311981102,"Antriksh","Chandigarh","Chandigarh","2023","CSE","9876781230","antriksh1101@gmail.com",false,null),
(2311981103,"Ayush","Panipat","Haryana","2023","CSE","9877890123","ayush1101@gmail.com",false,null),
(2311981104,"Ayush","Palampur","Himhal Pradesh","2023","BCA","9878901234","ayush1101@gmail.com",false,null),
(2311981105,"Dev","Nahaan","Himhal Pradesh","2023","CSE","9879012345","dev1101@gmail.com",false,null),
(2311981106,"Gagan","Chandigarh","Chandigarh","2023","CSE","9871234567","gagan1101@gmail.com",false,null),
(2311981107,"Kashish","Bathinda","Punjab","2023","CSE","9872345678","kashish1101@gmail.com",false,null),
(2311981108,"Harshit","Panchkula","Haryana","2023","CSE","9873456789","harshit1101@gmail.com",false,null),
(2311981109,"Manish","Ganganagar","Rajasthan","2023","BCA","9874567890","manish1101@gmail.com",false,null),
(2311981110,"Priyanshu","Mohali","Punjab","2023","CSE","9875678901","priyanshu1101@gmail.com",false,null),
(2311981111,"Praveen","Kangra","Himachal Pradesh","2023","CSE","9876789012","praveen1101@gmail.com",false,null),
(2311981112,"Ravi","Bhiwani","Haryana","2023","BCA","9877890123","ravi1101@gmail.com",false,null),
(2311981113,"Shivam","Bathinda","Punjab","2023","CSE","9878901234","shivam1101@gmail.com",false,null),
(2311981114,"Vansh","Ganganagar","Rajasthan","2023","CSE","9879012345","vansh1101@gmail.com",false,null),
(2311981115,"Zahir","Chandigarh","Chandigarh","2023","BCA","9670123456","zahir1101@gmail.com",false,null)
;

select * from student;

ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'Pranav@125';
FLUSH PRIVILEGES;

