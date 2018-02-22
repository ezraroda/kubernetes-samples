CREATE KEYSPACE IF NOT EXISTS demodb WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'DC1-K8Demo' : 3 };
USE demodb;
CREATE TABLE IF NOT EXISTS customers (id uuid, Username text,address text, PRIMARY KEY ((id), Username)); 
SELECT * FROM customers;